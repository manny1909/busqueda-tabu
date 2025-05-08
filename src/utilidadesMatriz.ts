import { MatrizTransporte } from "./models/models";

const matriz: MatrizTransporte = [
    [{ costo: 5, asignacion: 0 }, { costo: 1, asignacion: 0 }, { costo: 2, asignacion: 0 }, { costo: 3, asignacion: 0 }, { costo: 4, asignacion: 0 }, { costo: 7, asignacion: 0 }], // G
    [{ costo: 7, asignacion: 0 }, { costo: 2, asignacion: 0 }, { costo: 9, asignacion: 0 }, { costo: 1, asignacion: 0 }, { costo: 5, asignacion: 0 }, { costo: 6, asignacion: 0 }], // H
    [{ costo: 9, asignacion: 0 }, { costo: 1, asignacion: 0 }, { costo: 5, asignacion: 0 }, { costo: 2, asignacion: 0 }, { costo: 3, asignacion: 0 }, { costo: 3, asignacion: 0 }], // I
    [{ costo: 6, asignacion: 0 }, { costo: 5, asignacion: 0 }, { costo: 8, asignacion: 0 }, { costo: 4, asignacion: 0 }, { costo: 1, asignacion: 0 }, { costo: 4, asignacion: 0 }], // J
    [{ costo: 8, asignacion: 0 }, { costo: 7, asignacion: 0 }, { costo: 11, asignacion: 0 }, { costo: 6, asignacion: 0 }, { costo: 4, asignacion: 0 }, { costo: 5, asignacion: 0 }], // K
    [{ costo: 2, asignacion: 0 }, { costo: 5, asignacion: 0 }, { costo: 7, asignacion: 0 }, { costo: 5, asignacion: 0 }, { costo: 2, asignacion: 0 }, { costo: 1, asignacion: 0 }]  // L
];

// Oferta por origen (G, H, I, J, K, L)
const oferta = [400, 500, 300, 150, 600, 350];
// Demanda por destino (A, B, C, D, E, F)
const demanda = [300, 500, 700, 300, 250, 250];


export const destinos = ['A', 'B', 'C', 'D', 'E', 'F']
export const origenes = ['G', 'H', 'I', 'J', 'K', 'L']

export function generarSolucionAleatoria(): MatrizTransporte {
    const filas = oferta.length;
    const columnas = demanda.length;
  
    // Clonar matriz base con costos
    const solucion = clonarMatriz(matriz);
  
    // Copias de oferta y demanda para ir restando
    const ofertaDisponible = [...oferta];
    const demandaPendiente = [...demanda];
  
    // Iterar hasta cumplir con toda la demanda
    while (demandaPendiente.some(d => d > 0)) {
      // Elegir origen y destino aleatorios con capacidad/disponibilidad
      const i = Math.floor(Math.random() * filas);
      const j = Math.floor(Math.random() * columnas);
  
      const maxAsignable = Math.min(ofertaDisponible[i], demandaPendiente[j]);
      if (maxAsignable > 0) {
        const cantidad = Math.floor(Math.random() * maxAsignable) + 1;
  
        solucion[i][j].asignacion += cantidad;
        ofertaDisponible[i] -= cantidad;
        demandaPendiente[j] -= cantidad;
      }
    }
  
    return solucion;
  }
  
export function evaluarCostoTotal(matriz: MatrizTransporte): number {
    let total = 0;
    for (const fila of matriz) {
        for (const celda of fila) {
            total += (celda.asignacion || 0) * celda.costo;
        }
    }
    return total;
}
export function clonarMatriz(matriz: MatrizTransporte): MatrizTransporte {
    return matriz.map(fila =>
        fila.map(celda => ({ costo: celda.costo, asignacion: celda.asignacion }))
    );
}

export function calcularPenalizacion(matriz: MatrizTransporte): number {
    let excesoOferta = 0;
    let deficitDemanda = 0;
  
    // Exceso de oferta
    for (let i = 0; i < matriz.length; i++) {
      const suma = matriz[i].reduce((acc, celda) => acc + (celda.asignacion || 0), 0);
      if (suma > oferta[i]) {
        excesoOferta += suma - oferta[i];
      }
    }
  
    // Déficit de demanda
    for (let j = 0; j < matriz[0].length; j++) {
      let suma = 0;
      for (let i = 0; i < matriz.length; i++) {
        suma += matriz[i][j].asignacion || 0;
      }
      if (suma < demanda[j]) {
        deficitDemanda += demanda[j] - suma;
      }
    }
  
    const penalizacion = 10; // valor de penalización por unidad violada
    return penalizacion * (excesoOferta + deficitDemanda);
  }
  