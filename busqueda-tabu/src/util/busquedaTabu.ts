import { MatrizTransporte, Movimiento, ResultadoBusquedaTabu } from "../models/models";
import {
    calcularPenalizacion,
    clonarListaTabu,
    clonarMatriz,
    evaluarCostoTotal
} from "./utilidadesMatriz";

export function busquedaTabu(
    solucionInicial: MatrizTransporte,
    iteracionesMax: number,
    tamanioListaTabu: number
): ResultadoBusquedaTabu {
    let solucionActual = clonarMatriz(solucionInicial);
    let mejorSolucion = clonarMatriz(solucionInicial);
    let costoMejor = evaluarCostoTotal(solucionActual) + calcularPenalizacion(solucionActual);
    const historialCostos: number[] = [costoMejor];

    let listaTabu: Movimiento[][] = [];
    let historialListaTabu: Movimiento[][][] = [];
    for (let iter = 0; iter < iteracionesMax; iter++) {
        const vecinos = generarVecinos(solucionActual);
        if (!vecinos.length) break;

        const indice = indiceMejorVecino(vecinos);
        const mejorVecino = vecinos[indice];
        const movimiento = extraerMovimiento(solucionActual, mejorVecino);
        const esTabu = listaTabu.some(m => compararMovimientos(m, movimiento));
        const costoVecino = evaluarCostoTotal(mejorVecino) + calcularPenalizacion(mejorVecino);
        const esAspiracion = costoVecino < costoMejor;

        if (!esTabu || esAspiracion) {
            solucionActual = clonarMatriz(mejorVecino);
            historialCostos.push(costoVecino);

            if (costoVecino < costoMejor) {
                mejorSolucion = clonarMatriz(mejorVecino);
                costoMejor = costoVecino;
            }

            listaTabu = actualizarTabu(movimiento, listaTabu, tamanioListaTabu, esTabu);
            if (listaTabu.length > tamanioListaTabu) {
                listaTabu = listaTabu.slice(0, tamanioListaTabu);
            }
            historialListaTabu.push(clonarListaTabu(listaTabu));
        }
    }
    console.log('historial lista tabu', historialListaTabu)

    return { mejorSolucion, costoMejor, historialCostos, historialListaTabu };
}
// Devuelve el índice del vecino con menor costo total (costo + penalización).
function indiceMejorVecino(vecinos: MatrizTransporte[]): number {
    let mejor = 0;
    let mejorCosto = evaluarCostoTotal(vecinos[0]) + calcularPenalizacion(vecinos[0]);

    for (let i = 1; i < vecinos.length; i++) {
        const costo = evaluarCostoTotal(vecinos[i]) + calcularPenalizacion(vecinos[i]);
        if (costo < mejorCosto) {
            mejor = i;
            mejorCosto = costo;
        }
    }

    return mejor;
}
function actualizarTabu(
    movimiento: Movimiento[],
    listaTabu: Movimiento[][],
    tamanioListaTabu: number,
    esTabu: boolean
): Movimiento[][] {
    let nuevaLista = [...listaTabu];

    if (esTabu) {
        nuevaLista = nuevaLista.filter(m => !compararMovimientos(m, movimiento));
      }
    
      // Agregar al inicio
      nuevaLista.unshift(movimiento);
    
      // Respetar tamaño máximo
      if (nuevaLista.length > tamanioListaTabu) {
        nuevaLista.pop(); // elimina el más antiguo
      }

    return nuevaLista;
}
function extraerMovimiento(
    anterior: MatrizTransporte,
    vecino: MatrizTransporte
): Movimiento[] {
    const movimientos: Movimiento[] = [];

    for (let i = 0; i < anterior.length; i++) {
        for (let j = 0; j < anterior[0].length; j++) {
            const asignacionAnterior = anterior[i][j].asignacion || 0;
            const asignacionVecino = vecino[i][j].asignacion || 0;

            if (asignacionAnterior !== asignacionVecino) {
                movimientos.push({
                    fila: i,
                    columna: j,
                    diferencia: asignacionVecino - asignacionAnterior
                });
            }
        }
    }

    return movimientos;
}
function compararMovimientos(m1: Movimiento[], m2: Movimiento[]): boolean {
    if (m1.length !== m2.length) return false;

    return m1.every(mov1 =>
        m2.some(mov2 =>
            mov1.fila === mov2.fila &&
            mov1.columna === mov2.columna &&
            mov1.diferencia === mov2.diferencia
        )
    );
}
function generarVecinos(
    matriz: MatrizTransporte,
    cantidadVecinos: number = 10,
    delta: number = 10
): MatrizTransporte[] {
    const vecinos: MatrizTransporte[] = [];
    const filas = matriz.length;
    const columnas = matriz[0].length;

    let intentos = 0;
    const maxIntentos = cantidadVecinos * 5;

    while (vecinos.length < cantidadVecinos && intentos < maxIntentos) {
        const i1 = Math.floor(Math.random() * filas);
        const j1 = Math.floor(Math.random() * columnas);
        const i2 = Math.floor(Math.random() * filas);
        const j2 = Math.floor(Math.random() * columnas);

        if (i1 === i2 && j1 === j2) {
            intentos++;
            continue;
        }

        const asignacion1 = matriz[i1][j1].asignacion || 0;
        if (asignacion1 < delta) {
            intentos++;
            continue;
        }

        const vecino = clonarMatriz(matriz);
        vecino[i1][j1].asignacion -= delta;
        vecino[i2][j2].asignacion += delta;

        vecinos.push(vecino);
        intentos++;
    }

    return vecinos;
}
