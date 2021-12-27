import { Injectable } from '@angular/core';
import { Medicamento } from 'src/app/shared/models/medicamento';

@Injectable({
  providedIn: 'root',
})

export class MedicamentoService {
  medicamentoData: Medicamento[] = [
    { id: 1, nombre: 'Acetaminofen', codBarras: 'ASD123', codCompra: '001H', cantidad: 3, precio: 1000, nombreLaboratorio: 'Bayer', nombreDosificacion: 'Hydro'},
    { id: 2, nombre: 'Ibuprofeno', codBarras: 'ASD456', codCompra: '002H', cantidad: 1, precio: 2000, nombreLaboratorio: 'MK', nombreDosificacion: 'Hydro'},
    { id: 3, nombre: 'Loratadina', codBarras: 'ASD789', codCompra: '003H', cantidad: 4, precio: 500, nombreLaboratorio: 'Genfar', nombreDosificacion: 'Hydro'},
  ];

  constructor() {}

  getMedicamentos(): Medicamento[] {
    return this.medicamentoData;
  }

  agregarMedicamento(Medicamento: Medicamento): Medicamento {
    Medicamento.id = this.medicamentoData.length + 1;
    this.medicamentoData.push(Medicamento);
    return Medicamento;
  }

  editarMedicamento(medicamento: Medicamento): Medicamento {
    let indexMedicamento = this.medicamentoData.findIndex(
      (item) => item.id == medicamento.id
    );
    Object.assign(this.medicamentoData[indexMedicamento], medicamento);
    return medicamento;
  }

  eliminarMedicamento(id: number) {
    this.medicamentoData = this.medicamentoData.filter((item) => item.id != id);
  }
}
