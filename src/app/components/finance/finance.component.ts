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
  // displayedColumns: string[] = ['select', 'detalle', 'fecha', 'subtotal', 'iva', 'total', 'nota'];
  displayedColumns: string[] = ['select', 'detalle', 'fecha', 'total'];
  studentDataSources: { [studentId: string]: MatTableDataSource<BoletaDetalle> } = {};
  selections: { [studentId: string]: SelectionModel<BoletaDetalle> } = {};
  student?: IApoderado[] = [];
  studentBoletas: { estudiante: IEstudiante, boletas: BoletaDetalle[] }[] = [];
  selectedBoletas: Map<string, BoletaDetalle[]> = new Map();
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
          const boletasFlatList: BoletaDetalle[] = dataStudent.boletas[studentId].reduce<BoletaDetalle[]>((acc, val) => acc.concat(val), []);
          this.studentDataSources[studentId] = new MatTableDataSource<BoletaDetalle>(boletasFlatList);
          this.selections[studentId] = new SelectionModel<BoletaDetalle>(true, []);
        }
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

  isAllSelected(studentId: string): boolean {
    const currentSelection = this.selections[studentId];
    const dataSource = this.studentDataSources[studentId];
    const numSelected = currentSelection.selected.length;
    const numRows = dataSource.data.filter(row => !this.isBoletaPagada(row)).length;
    return numSelected === numRows;
  }

  isBoletaPagada(boleta: BoletaDetalle): boolean {
    return boleta.estado_id === 2 || boleta.estado_id === 4;
  }

  toggleRow(studentId: string, row: BoletaDetalle) {
    if (!this.isBoletaPagada(row)) {
      this.selections[studentId].toggle(row);
    }
  }

  masterToggle(studentId: string) {
    const currentSelection = this.selections[studentId];
    const dataSource = this.studentDataSources[studentId];

    if (this.isAllSelected(studentId)) {
      currentSelection.clear();
    } else {
      dataSource.data.forEach(row => {
        if (!this.isBoletaPagada(row)) {
          currentSelection.select(row);
        }
      });
    }
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