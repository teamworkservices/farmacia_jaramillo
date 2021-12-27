import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';

import { Laboratorio } from 'src/app/shared/models/laboratorio';
import { LaboratorioService } from '../../../services/laboratorio.service';

@Component({
  selector: 'app-crear-laboratorio',
  templateUrl: './crear-laboratorio.component.html',
  styleUrls: ['./crear-laboratorio.component.css']
})
export class CrearLaboratorioComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private laboratorioService: LaboratorioService,
    public dialogRef: MatDialogRef<CrearLaboratorioComponent>
  ) {
    this.form = this.fb.group({
      codigoCtrl: ['', [Validators.required, Validators.maxLength(3)]],
      nombreCtrl: ['', [Validators.required, Validators.maxLength(20)]],
    });
  }

  ngOnInit(): void {}

  agregarLaboratorio() {
    if (this.form.valid) {
      let laboratorio = new Laboratorio();
      laboratorio.codigo = this.form.value['codigoCtrl'];
      laboratorio.nombre = this.form.value['nombreCtrl'];

      laboratorio = this.laboratorioService.agregarLaboratorio(laboratorio);
      this.dialogRef.close(laboratorio);
    }
  }

  confirmModal() {
    Swal.fire({
      title: 'Correcto',
      text: '¡Laboratorio agregado exitosamente!',
      icon: 'success',
      showConfirmButton: false,
      timer: 2000
    })
  }

}
