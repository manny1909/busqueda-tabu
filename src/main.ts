import { busquedaTabu } from "./busquedaTabu";
import { origenes, generarSolucionAleatoria, } from "./utilidadesMatriz";

function main(): void {

    // Paso 1: generar solución inicial (vacía)
    const solucionInicial = generarSolucionAleatoria();

    // Paso 2: ejecutar búsqueda tabú
    const resultado = busquedaTabu(solucionInicial, 100, 7); // 100 iteraciones, lista tabú de tamaño 7

    // Paso 3: mostrar resultados
    console.log("Mejor costo total (con penalización):", resultado.costoMejor);
    console.log("Historial de costos:", resultado.historialCostos);

    // Mostrar matriz de asignaciones finales
    console.log("Matriz final de asignaciones:");
    for (let i = 0; i < resultado.mejorSolucion.length; i++) {
        const fila = resultado.mejorSolucion[i].map(c => c.asignacion).join("\t");
        console.log(`${origenes[i]}:\t${fila}`);
    }
}
main();


