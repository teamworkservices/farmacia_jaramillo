import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Dosificacion } from 'src/app/shared/models/dosificacion';
import { Laboratorio } from 'src/app/shared/models/laboratorio';
import { Medicamento } from 'src/app/shared/models/medicamento';
import Swal from 'sweetalert2';
import { DosificacionService } from '../../../services/dosificacion.service';
import { LaboratorioService } from '../../../services/laboratorio.service';
import { MedicamentoService } from '../../../services/medicamento.service';

@Component({
  selector: 'app-crear-medicamento',
  templateUrl: './crear-medicamento.component.html',
  styleUrls: ['./crear-medicamento.component.css'],
})
export class CrearMedicamentoComponent implements OnInit {
  form: FormGroup;

  dataLaboratorios: Laboratorio [] = [];
  dataDosificaciones: Dosificacion[] = [];

  selectedValueDosificacion: string = "";
  selectedValueLab: string = "";

  constructor(
    private fb: FormBuilder,
    private medicamentoService: MedicamentoService,
    private laboratorioService: LaboratorioService,
    private dosificacionService: DosificacionService,
    public dialogRef: MatDialogRef<CrearMedicamentoComponent>
  ) {
    this.form = this.fb.group({
      nombreCtrl: ['', [Validators.required, Validators.maxLength(20)]],
      precioCtrl: ['', [Validators.required, Validators.maxLength(10)]],
      cantidadCtrl: ['', [Validators.required, Validators.maxLength(4)]],
      codBarrasCtrl: ['', [Validators.required, Validators.maxLength(15)]],
      codCompraCtrl: ['', [Validators.required, Validators.maxLength(15)]],
      dosificacionCtrl: ['', [Validators.required]],
      laboratorioCtrl: ['', [Validators.required]],
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

  agregarMedicamento() {
    if (this.form.valid) {
      let medicamento = new Medicamento();
      medicamento.nombre = this.form.value['nombreCtrl'];
      medicamento.precio = this.form.value['precioCtrl'];
      medicamento.cantidad = this.form.value['cantidadCtrl'];
      medicamento.codBarras = this.form.value['codBarrasCtrl'];
      medicamento.codCompra = this.form.value['codCompraCtrl'];
      medicamento.nombreDosificacion = this.form.value['dosificacionCtrl'];
      medicamento.nombreLaboratorio = this.form.value['laboratorioCtrl'];

      medicamento = this.medicamentoService.agregarMedicamento(medicamento);
      this.dialogRef.close(medicamento);
    }
  }

  confirmModal() {
    Swal.fire({
      title: 'Correcto',
      text: '¡Medicamento agregado exitosamente!',
      icon: 'success',
      showConfirmButton: false,
      timer: 2000,
    });
  }
}
