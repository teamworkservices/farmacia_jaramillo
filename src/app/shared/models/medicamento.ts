export class Medicamento {
  id!: number;
  codCompra!: string;
  codBarras!: string;
  nombre!: string;
  precio!: number;
  cantidad!: number;
  nombreLaboratorio!: string;
  nombreDosificacion!: string;

  public constructor(partial?: Partial<Medicamento>) {
    Object.assign(this, partial);
  }
}
