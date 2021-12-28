import { Injectable } from '@angular/core';
import { Laboratorio } from 'src/app/shared/models/laboratorio';

@Injectable({
  providedIn: 'root',
})
export class LaboratorioService {
  laboratorioData: Laboratorio[] = [
    { id: 1, nombre: 'MK', codigo: 'MK' },
    { id: 2, nombre: 'Genfar', codigo: 'GEN' },
    { id: 3, nombre: 'Bayer', codigo: 'BAY' },
  ];

  constructor() {}

  getLaboratorios(): Laboratorio[] {
    return this.laboratorioData;
  }

  agregarLaboratorio(Laboratorio: Laboratorio): Laboratorio {
    Laboratorio.id = this.laboratorioData.length + 1;
    this.laboratorioData.push(Laboratorio);
    return Laboratorio;
  }

  editarLaboratorio(Laboratorio: Laboratorio): Laboratorio {
    let indexLaboratorio = this.laboratorioData.findIndex(
      (item) => item.id == Laboratorio.id
    );
    Object.assign(this.laboratorioData[indexLaboratorio], Laboratorio);
    return Laboratorio;
  }

  eliminarLaboratorio(id: number) {
    this.laboratorioData = this.laboratorioData.filter((item) => item.id != id);
  }

  getLaboratorioById(id: number) {
    let indexLab = this.laboratorioData.findIndex((item) => item.id == id);
    return this.laboratorioData[indexLab];
  }
}
