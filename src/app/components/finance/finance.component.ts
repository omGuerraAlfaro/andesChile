import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { InfoApoderadoService } from 'src/app/services/apoderadoService/infoApoderado.service';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { BoletaDetalle, IBoleta } from 'src/interfaces/boletaInterface';
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

  constructor(
    private router: Router,
    public toastController: ToastController,
    public alertController: AlertController,
    public apoderadoService: InfoApoderadoService
  ) { }

  async ngOnInit() {
    const rut = localStorage.getItem('rutAmbiente');
    this.apoderadoService.getInfoBoletasApoderado(rut).subscribe({
      next: (dataStudent: IBoleta) => {
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
  }

  isAllSelected(studentId: string) {
    const selection = this.selections[studentId];
    const numSelected = selection.selected.length;
    const numRows = this.studentDataSources[studentId].data.length;
    return numSelected === numRows;
  }

  toggleRow(studentId: string, row: BoletaDetalle) {
    this.selections[studentId].toggle(row);
    // Imprimir los elementos seleccionados para este estudiante en la consola
    console.log('Selecciones individuales para', studentId, this.selections[studentId].selected);
  }

  masterToggle(studentId: string) {
    this.isAllSelected(studentId) ?
      this.selections[studentId].clear() :
      this.studentDataSources[studentId].data.forEach(row => this.selections[studentId].select(row));
    // Imprimir los elementos seleccionados para este estudiante en la consola
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
    const selectedItems = Object.keys(this.selections).reduce<{ id: number; detail: string; expirationDate: string; mount: string; }[]>((acc, studentId) => {
      const selectedForStudent = this.selections[studentId].selected.map((item) => ({
        id: item.id,
        detail: item.detalle, // Asegúrate de que los nombres de las propiedades coincidan con tu interfaz
        expirationDate: item.fecha,
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