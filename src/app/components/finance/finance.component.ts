import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { InfoApoderadoService } from 'src/app/services/apoderadoService/infoApoderado.service';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { BoletaDetalle, IBoleta } from 'src/interfaces/boletaInterface';
import { EstudianteService } from 'src/app/services/estudianteService/estudiante.service';
import { IApoderado, IEstudiante } from 'src/interfaces/apoderadoInterface';
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
          
          // Contar boletas pagadas y pendientes
          this.cuotasPorEstudiante[studentId] = { pagadas: 0, pendientes: 0 };
          boletasColegiatura.forEach(boleta => {
            if (boleta.estado_id === 2) { // Estado "Pagada"
              this.cuotasPorEstudiante[studentId].pagadas++;
            } else {
              this.cuotasPorEstudiante[studentId].pendientes++;
            }
          });
    
          boletasPae.forEach(boleta => {
            if (boleta.estado_id === 2) { // Estado "Pagada"
              this.cuotasPorEstudiante[studentId].pagadas++;
            } else {
              this.cuotasPorEstudiante[studentId].pendientes++;
            }
          });
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
        console.log(dataStudent);
      },
      error: (error) => {
        console.error('Error fetching student data:', error);
      }
    });
  }

  isAllSelected(studentId: string) {
    const selection = this.selections[studentId];
    const numSelected = selection.selected.length;
    const numRows = this.studentDataSourcesColegiatura[studentId].data.length;
    return numSelected === numRows;
  }

  isBoletaPagada(boleta: BoletaDetalle): boolean {
    return boleta.estado_id === 2;
  }

  toggleRow(studentId: string, row: BoletaDetalle) {
    if (!this.isBoletaPagada(row)) {
      this.selections[studentId].toggle(row);
      console.log('Selecciones individuales para', studentId, this.selections[studentId].selected);
    }
  }

  // Modifica también la función masterToggle para excluir las boletas pagadas
  masterToggle(studentId: string) {
    if (this.isAllSelected(studentId)) {
      this.selections[studentId].clear();
    } else {
      this.studentDataSourcesColegiatura[studentId].data.forEach(row => {
        if (!this.isBoletaPagada(row)) {
          this.selections[studentId].select(row);
        }
      });
    }
    console.log('Selecciones para', studentId, this.selections[studentId].selected);
  }

  checkboxLabel(studentId: string, row?: BoletaDetalle): string {
    if (!row) {
      return `${this.isAllSelected(studentId) ? 'deselect' : 'select'} all`;
    }
    return `${this.selections[studentId].isSelected(row) ? 'deselect' : 'select'} row ${row.id}`;
  }

  objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  goPagar() {
    // Asegúrate de que el acumulador inicial en reduce tiene un tipo explícito
    const selectedItems = Object.keys(this.selections).reduce<{ id: number; detail: string; fecha_vencimiento: string; mount: string; }[]>((acc, studentId) => {
      const selectedForStudent = this.selections[studentId].selected.map((item) => ({
        id: item.id,
        detail: item.detalle,
        fecha_vencimiento: item.fecha_vencimiento,
        mount: item.total
      }));
      return [...acc, ...selectedForStudent]; // Usa el operador de propagación para concatenar los arrays
    }, []); // El acumulador inicial es un array vacío con un tipo explícito

    if (selectedItems.length === 0) {
      this.presentToast('Debe seleccionar al menos 1 cuota para pagar', 3000);
    } else {
      const navigationExtras: NavigationExtras = {
        state: {
          dataPago: selectedItems
        },
      };
      // Navegar a la página de pago con los elementos seleccionados como datos de estado
      this.router.navigate(['/tbk'], navigationExtras);
    }
  }



  async presentToast(msg: string, duracion?: number) {
    const toast = await this.toastController.create({
      message: msg,
      duration: duracion ? duracion : 2000,
    });
    toast.present();
  }
}