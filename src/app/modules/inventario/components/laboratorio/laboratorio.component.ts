//Angular imports
import { Component, OnInit } from '@angular/core';

//Third Party imports
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import Swal from 'sweetalert2';

//Application imports
import { Laboratorio } from 'src/app/shared/models/laboratorio';
import { LaboratorioService } from '../../services/laboratorio.service';
import { CrearLaboratorioComponent } from './crear-laboratorio/crear-laboratorio.component';
import { EditarLaboratorioComponent } from './editar-laboratorio/editar-laboratorio.component';

@Component({
  selector: 'app-laboratorio',
  templateUrl: './laboratorio.component.html',
  styleUrls: ['./laboratorio.component.css'],
})
export class LaboratorioComponent implements OnInit {

  displayedColumns: string[] = ['id', 'nombre', 'codigo', 'acciones'];
  dataSource!: MatTableDataSource<Laboratorio>;

  constructor(
    public dialog: MatDialog,
    public laboratorioService: LaboratorioService
  ) {}

  ngOnInit(): void {
    this.loadTableLaboratorios();
  }

  /*Get all the labs saved using LaboratorioService*/
  loadLaboratorios() {
    return this.laboratorioService.getLaboratorios();
  }

  /*Load the table with the data obtained from loadLaboratorios function*/
  loadTableLaboratorios() {
    this.dataSource = new MatTableDataSource<Laboratorio>([]);
    this.dataSource.data = this.loadLaboratorios();
  }

  /*Open a modal window to create a new laboratory*/
  openCreateDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '50%';
    dialogConfig.panelClass = 'dialog-custom';
    const dialogRef = this.dialog.open(CrearLaboratorioComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      if (!!result) {
        this.loadLaboratorios();
        this.loadTableLaboratorios();
      }
    });
  }

  /*Open a modal window to update a existing laboratory*/
  openEditDialog(laboratorio: Laboratorio) {
    const dialogRef = this.dialog.open(EditarLaboratorioComponent, {
      width: '50%',
      data: laboratorio,
      panelClass: 'dialog-custom',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (!!result) {
        this.loadLaboratorios();
        this.loadTableLaboratorios();
      }
    });
  }

  /*Open a modal window to delete a existing laboratory*/
  eliminarLaboratorio(laboratorio: Laboratorio) {
    Swal.fire({
      title: '¿Deseas eliminar el laboratorio?',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.laboratorioService.eliminarLaboratorio(laboratorio.id);
        this.loadTableLaboratorios();
        Swal.fire('¡Laboratorio eliminado exitosamente!', '', 'success');
      }
    });
  }
}
