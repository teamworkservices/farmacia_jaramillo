import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Dosificacion } from 'src/app/shared/models/dosificacion';
import { Laboratorio } from 'src/app/shared/models/laboratorio';
import { Medicamento } from 'src/app/shared/models/medicamento';
import Swal from 'sweetalert2';
import { MedicamentoService } from '../../../services/medicamento.service';
import { CrearMedicamentoComponent } from '../crear-medicamento/crear-medicamento.component';

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
    public dialogRef: MatDialogRef<CrearMedicamentoComponent>
  ) {
    this.form = this.fb.group({
      nombreCtrl: ['', [Validators.required, Validators.maxLength(20)]],
      precioCtrl: ['', [Validators.required, Validators.maxLength(10)]],
      cantidadCtrl: ['', [Validators.required, Validators.maxLength(4)]],
      codBarrasCtrl: ['', [Validators.required, Validators.maxLength(15)]],
      codCompraCtrl: ['', [Validators.required, Validators.maxLength(15)]],
    });
  }

  ngOnInit(): void {}

  loadLaboratorios() {}

  loadDosificaciones() {}

  editarMedicamento() {
    if (this.form.valid) {
      let medicamento = new Medicamento();
      /*laboratorio.id = this.data.id;
      laboratorio.codigo = this.form.value['codigoCtrl'];
      laboratorio.nombre = this.form.value['nombreCtrl'];

      Object.assign(
        laboratorio,
        this.laboratorioService.editarLaboratorio(laboratorio)
      );
      this.dialogRef.close(laboratorio);*/
    }
  }

  confirmModal() {
    Swal.fire({
      title: 'Correcto',
      text: 'Medicamento actualizado exitosamente!',
      icon: 'success',
      showConfirmButton: false,
      timer: 2000,
    });
  }
}
