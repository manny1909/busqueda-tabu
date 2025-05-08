import './App.css';
import { results } from './util/main'
import React from 'react'
import Grafico  from "./components/Grafico";
function App() {
  const { historialCostos, mejorSolucion, costoMejor } = results
  React.useEffect(()=>{
    console.log('mejorSolucion: ', mejorSolucion)
    console.log('costoMejor: ', costoMejor)
  },[])
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-center">Gráfico de Costos</h1>
      <div className='container-grafico'>
      <Grafico historialCostos={ historialCostos } />
      </div>
    </div>
  );
}

export default App;
