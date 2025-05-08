export type MatrizTransporte = Celda[][];
 
export class Celda {
    costo: number;
    asignacion: number = 0;
    constructor(costo: number, asignacion: number) {
        this.costo = costo;
        this.asignacion = asignacion;
    }
}
export interface ResultadoBusquedaTabu {
    mejorSolucion: MatrizTransporte;
    costoMejor: number;
    historialCostos: number[];
}

export interface Movimiento {
    fila: number;
    columna: number;
    diferencia: number; // nuevaAsignación - anteriorAsignación
  }
  