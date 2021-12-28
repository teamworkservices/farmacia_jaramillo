import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Dosificacion } from 'src/app/shared/models/dosificacion';
import { Laboratorio } from 'src/app/shared/models/laboratorio';
import { Medicamento } from 'src/app/shared/models/medicamento';
import Swal from 'sweetalert2';
import { DosificacionService } from '../../../services/dosificacion.service';
import { LaboratorioService } from '../../../services/laboratorio.service';
import { MedicamentoService } from '../../../services/medicamento.service';

@Component({
  selector: 'app-editar-medicamento',
  templateUrl: './editar-medicamento.component.html',
  styleUrls: ['./editar-medicamento.component.css'],
})
export class EditarMedicamentoComponent implements OnInit {
  form: FormGroup;

  dataLaboratorios: Laboratorio[] = [];
  dataDosificaciones: Dosificacion[] = [];

  constructor(
    private fb: FormBuilder,
    private medicamentoService: MedicamentoService,
    private laboratorioService: LaboratorioService,
    private dosificacionService: DosificacionService,
    public dialogRef: MatDialogRef<EditarMedicamentoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Medicamento
  ) {
    this.form = this.fb.group({
      nombreCtrl: [data.nombre, [Validators.required, Validators.maxLength(20)]],
      precioCtrl: [data.precio, [Validators.required, Validators.maxLength(10)]],
      cantidadCtrl: [data.cantidad, [Validators.required, Validators.maxLength(4)]],
      codBarrasCtrl: [data.codBarras, [Validators.required, Validators.maxLength(15)]],
      codCompraCtrl: [data.codCompra, [Validators.required, Validators.maxLength(15)]],
      dosificacionCtrl: [data.nombreDosificacion, [Validators.required]],
      laboratorioCtrl: [data.nombreLaboratorio, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.loadDosificaciones();
    this.loadLaboratorios();
  }

  loadLaboratorios() {
    this.dataLaboratorios = this.laboratorioService.getLaboratorios();
  }

  loadDosificaciones() {
    this.dataDosificaciones = this.dosificacionService.getDosificaciones();
  }

  editarMedicamento() {
    if (this.form.valid) {
      let medicamento = new Medicamento();
      medicamento.id = this.data.id;
      medicamento.nombre = this.form.value['nombreCtrl'];
      medicamento.precio = this.form.value['precioCtrl'];
      medicamento.cantidad = this.form.value['cantidadCtrl'];
      medicamento.codBarras = this.form.value['codBarrasCtrl'];
      medicamento.codCompra = this.form.value['codCompraCtrl'];
      medicamento.nombreDosificacion = this.form.value['dosificacionCtrl'];
      medicamento.nombreLaboratorio = this.form.value['laboratorioCtrl'];

      Object.assign(
        medicamento,
        this.medicamentoService.editarMedicamento(medicamento)
      );
      this.dialogRef.close(medicamento);
    }
  }

  confirmModal() {
    Swal.fire({
      title: 'Correcto',
      text: '¡Medicamento actualizado exitosamente!',
      icon: 'success',
      showConfirmButton: false,
      timer: 2000,
    });
  }
}
