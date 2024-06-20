import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { InfoApoderadoService } from 'src/app/services/apoderadoService/infoApoderado.service';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { BoletaDetalle, IBoleta } from 'src/interfaces/boletaInterface';
import { EstudianteService } from 'src/app/services/estudianteService/estudiante.service';
import { IApoderado, IEstudiante } from 'src/interfaces/apoderadoInterface';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-finance',
  templateUrl: './finance.component.html',
  styleUrls: ['./finance.component.scss'],
})
export class FinanceComponent implements OnInit {
  isLoading: boolean = true;
  // displayedColumns: string[] = ['select', 'detalle', 'fecha', 'subtotal', 'iva', 'total', 'nota'];
  displayedColumns: string[] = ['select', 'detalle', 'fecha', 'total'];
  studentDataSourcesColegiatura: { [studentId: string]: MatTableDataSource<BoletaDetalle> } = {};
  studentDataSourcesPae: { [studentId: string]: MatTableDataSource<BoletaDetalle> } = {};
  selections: { [studentId: string]: SelectionModel<BoletaDetalle> } = {};
  paeSelections: { [studentId: string]: SelectionModel<BoletaDetalle> } = {};

  student: IApoderado[] = [];
  studentBoletas: { estudiante: IEstudiante, boletas: BoletaDetalle[] }[] = [];
  selectedBoletas: Map<string, BoletaDetalle[]> = new Map();

  totalPagadas: number = 0;
  totalPendientes: number = 0;
  cuotasPorEstudiante: { [studentId: string]: { pagadas: number, pendientes: number } } = {};

  constructor(
    private router: Router,
    public toastController: ToastController,
    public alertController: AlertController,
    public apoderadoService: InfoApoderadoService,
    public estudianteService: EstudianteService,
    private cd: ChangeDetectorRef
  ) { }

  async ngOnInit() {
    const rut = localStorage.getItem('rutAmbiente');
    this.apoderadoService.getInfoBoletasApoderado(rut).subscribe({
      next: (dataStudent: IBoleta) => {
        console.log('Data student:', dataStudent);
        for (const studentId in dataStudent.boletas) {
          const boletasColegiatura = dataStudent.boletas[studentId].boletasColegiatura;
          const boletasPae = dataStudent.boletas[studentId].boletasPae;

          this.studentDataSourcesColegiatura[studentId] = new MatTableDataSource<BoletaDetalle>(boletasColegiatura);
          this.studentDataSourcesPae[studentId] = new MatTableDataSource<BoletaDetalle>(boletasPae);

          this.selections[studentId] = new SelectionModel<BoletaDetalle>(true, []);
          this.paeSelections[studentId] = new SelectionModel<BoletaDetalle>(true, []);

          // Contar boletas pagadas y pendientes
          this.cuotasPorEstudiante[studentId] = { pagadas: 0, pendientes: 0 };

          boletasColegiatura.forEach(boleta => {
            if (boleta.estado_id === 2 || boleta.estado_id === 6) { // Estado "Pagada"
              this.cuotasPorEstudiante[studentId].pagadas++;
            } else {
              this.cuotasPorEstudiante[studentId].pendientes++;
            }
          });

          /* boletasPae.forEach(boleta => {
            if (boleta.estado_id === 2 || boleta.estado_id === 6) { // Estado "Pagada"
              this.cuotasPorEstudiante[studentId].pagadas++;
            } else {
              this.cuotasPorEstudiante[studentId].pendientes++;
            }
          }); */
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching student data:', error);
      }
    });


    this.apoderadoService.getInfoApoderado(rut).subscribe({
      next: (dataStudent: IApoderado) => {
        this.student?.push(dataStudent);
        //console.log(dataStudent);
      },
      error: (error) => {
        console.error('Error fetching student data:', error);
      }
    });
  }

  isBoletaPagada(boleta: BoletaDetalle): boolean {
    return boleta.estado_id === 2 || boleta.estado_id === 5 || boleta.estado_id === 6;
  }

  isBoletaPendienteTransferencia(boleta: BoletaDetalle): boolean {
    return boleta.estado_id === 5;
  }

  toggleRow(studentId: string, row: BoletaDetalle, type: 'colegiatura' | 'pae') {
    const selectionModel = type === 'colegiatura' ? this.selections[studentId] : this.paeSelections[studentId];

    if (row.estado_id === 2) { // Si la boleta ya está pagada, no hacer nada.
      return;
    }
    if (!selectionModel.isSelected(row)) {
      selectionModel.clear(); // limpia cualquier selección
      selectionModel.select(row); // selecciona la nueva fila
      this.cd.detectChanges(); // Fuerza la detección de cambios para actualizar la UI
    }else{
      selectionModel.clear(); // limpia cualquier selección
    }
    const nextBoletaToPay = this.findNextBoletaToPay(studentId, type);
    if (nextBoletaToPay && row.id !== nextBoletaToPay.id) {
      this.presentToast('Por favor, seleccione la boleta que corresponde para pagar.', 3000);
      selectionModel.clear(); // limpia cualquier selección
      return; // Si no es la correcta, se muestra el toast y no se hace toggle.
    }
    console.log(`Selecciones ${type} para el estudiante ${studentId}:`, selectionModel.selected);
  }

  masterToggle(studentId: string, type: 'colegiatura' | 'pae') {
    const selectionModel = type === 'colegiatura' ? this.selections[studentId] : this.paeSelections[studentId];
    selectionModel.clear();  // Solo limpia las selecciones existentes
    this.cd.detectChanges();  // Detecta los cambios para asegurar que la UI se actualiza
  }


  checkboxLabel(studentId: string, row?: BoletaDetalle, type: 'colegiatura' | 'pae' = 'colegiatura'): string {
    if (!row) {
      return '';
    }
    const selectionModel = type === 'colegiatura' ? this.selections[studentId] : this.paeSelections[studentId];
    return `${selectionModel.isSelected(row) ? 'deselect' : 'select'} row ${row.id}`;
  }

  objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  goPagar() {
    let isValidSelection = true;
    let wrongSelectionToastShown = false;

    for (const studentId of Object.keys(this.selections)) {
      const nextBoletaToPayColegiatura = this.findNextBoletaToPay(studentId, 'colegiatura');
      this.selections[studentId].selected.forEach((row) => {
        if (nextBoletaToPayColegiatura && row.id !== nextBoletaToPayColegiatura.id) {
          if (!wrongSelectionToastShown) { // Mostrar el toast una vez
            this.presentToast('Por favor, seleccione la boleta que corresponde para pagar.', 3000);
            wrongSelectionToastShown = true;
          }
          isValidSelection = false;
        }
      });
    }

    for (const studentId of Object.keys(this.paeSelections)) {
      const nextBoletaToPayPae = this.findNextBoletaToPay(studentId, 'pae');
      this.paeSelections[studentId].selected.forEach((row) => {
        if (nextBoletaToPayPae && row.id !== nextBoletaToPayPae.id) {
          if (!wrongSelectionToastShown) { // Mostrar el toast una vez
            this.presentToast('Por favor, seleccione la boleta que corresponde para pagar.', 3000);
            wrongSelectionToastShown = true;
          }
          isValidSelection = false;
        }
      });
    }

    if (!isValidSelection) {
      return; // Si hay una selección no válida, detener el proceso.
    }
    
    const allStudentIds = new Set([...Object.keys(this.selections), ...Object.keys(this.paeSelections)]);

    const selectedItems = Array.from(allStudentIds).reduce<{ id: number; detail: string; fecha_vencimiento: string; mount: string; }[]>((acc, studentId) => {
      const selectedForColegiatura = this.selections[studentId]?.selected.map((item) => ({
        id: item.id,
        detail: item.detalle,
        fecha_vencimiento: item.fecha_vencimiento,
        mount: item.total
      })) ?? [];

      const selectedForPae = this.paeSelections[studentId]?.selected.map((item) => ({
        id: item.id,
        detail: item.detalle,
        fecha_vencimiento: item.fecha_vencimiento,
        mount: item.total
      })) ?? [];

      return [...acc, ...selectedForColegiatura, ...selectedForPae]; // Combina las selecciones de ambos tipos sin duplicar
    }, []);

    if (selectedItems.length === 0) {
      this.presentToast('Debe seleccionar al menos 1 cuota para pagar', 3000);
    } else {
      const navigationExtras: NavigationExtras = {
        state: {
          dataPago: selectedItems
        },
      };
      // Navegar a la página de pago con los elementos seleccionados como datos de estado
      this.router.navigate(['/tbk/webpay-peticion'], navigationExtras);
    }
  }

  findNextBoletaToPay(studentId: string, type: 'colegiatura' | 'pae'): BoletaDetalle | null {
    const boletas = type === 'colegiatura'
      ? this.studentDataSourcesColegiatura[studentId].data
      : this.studentDataSourcesPae[studentId].data;

    const notPaidBoletas = boletas.filter(boleta => boleta.estado_id !== 2 && boleta.estado_id !== 5 && boleta.estado_id !== 6);
    const sortedNotPaidBoletas = notPaidBoletas.sort((a, b) => a.id - b.id);

    return sortedNotPaidBoletas.length > 0 ? sortedNotPaidBoletas[0] : null;
  }

  async presentToast(msg: string, duracion?: number) {
    const toast = await this.toastController.create({
      message: msg,
      duration: duracion ? duracion : 2000, position: 'top',
    });
    toast.present();
  }
}
