import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Medicamento } from 'src/app/shared/models/medicamento';
import Swal from 'sweetalert2';
import { MedicamentoService } from '../../services/medicamento.service';
import { CrearMedicamentoComponent } from './crear-medicamento/crear-medicamento.component';
import { EditarMedicamentoComponent } from './editar-medicamento/editar-medicamento.component';

@Component({
  selector: 'app-medicamento',
  templateUrl: './medicamento.component.html',
  styleUrls: ['./medicamento.component.css']
})
export class MedicamentoComponent implements OnInit {

  displayedColumns: string[] = ['id', 'nombre', 'precio', 'cantidad', 'nombreDosificacion', 'codBarras', 'codCompra', 'nombreLaboratorio', 'acciones'];
  dataSource!: MatTableDataSource<Medicamento>;

  constructor(
    public dialog: MatDialog,
    public medicamentoService: MedicamentoService
  ) {}

  ngOnInit(): void {
    this.loadTableMedicamentos();
  }

  /*Get all the medicaments saved using medicamentoService*/
  loadMedicamentos() {
    return this.medicamentoService.getMedicamentos();
  }

  /*Load the table with the data obtained from loadMedicamentos function*/
  loadTableMedicamentos() {
    this.dataSource = new MatTableDataSource<Medicamento>([]);
    this.dataSource.data = this.loadMedicamentos();
  }

  /*Open a modal window to create a new laboratory*/
  openCreateDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '50%';
    dialogConfig.panelClass = 'dialog-custom';
    const dialogRef = this.dialog.open(CrearMedicamentoComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      if (!!result) {
        this.loadMedicamentos();
        this.loadTableMedicamentos();
      }
    });
  }

  /*Open a modal window to update a existing laboratory*/
  openEditDialog(Medicamento: Medicamento) {
    const dialogRef = this.dialog.open(EditarMedicamentoComponent, {
      width: '50%',
      data: Medicamento,
      panelClass: 'dialog-custom',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (!!result) {
        this.loadMedicamentos();
        this.loadTableMedicamentos();
      }
    });
  }

  /*Open a modal window to delete a existing laboratory*/
  eliminarMedicamento(medicamento: Medicamento) {
    Swal.fire({
      title: '¿Deseas eliminar el medicamento?',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.medicamentoService.eliminarMedicamento(medicamento.id);
        this.loadTableMedicamentos();
        Swal.fire('¡Medicamento eliminado exitosamente!', '', 'success');
      }
    });
  }

}
