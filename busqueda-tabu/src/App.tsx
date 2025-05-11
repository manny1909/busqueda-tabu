import React from 'react';
import './App.css';
import { generarSolucionAleatoria } from './util/utilidadesMatriz';
import { busquedaTabu } from './util/busquedaTabu';
import Grafico from './components/Grafico';
import { MejorSolucion } from './components/MejorSolucion';
import { HistorialListaTabu } from './components/HistorialListaTabu';

function App() {
  // Paso 1: generar solución inicial (vacía)
  const solucionInicial = generarSolucionAleatoria();
  // Paso 2: ejecutar búsqueda tabú
  const resultado = busquedaTabu(solucionInicial, 150, 7); // 100 iteraciones, lista tabú de tamaño 7
  // Paso 3: mostrar resultados
  return (
    <div className="App">
      {resultado && (
        <div>
          <div className="container-grafico">
            <MejorSolucion mejorSolucion={solucionInicial} titulo={'Solución inicial generada aleatoriamente'} />
            <MejorSolucion mejorSolucion={resultado.mejorSolucion} titulo={'Solución final con mejor asignación'} />
            <Grafico historialCostos={resultado.historialCostos} />
            <h4>Mejor costo (con penalización): ${resultado.costoMejor}</h4>
            <HistorialListaTabu historialListaTabu={resultado.historialListaTabu} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
