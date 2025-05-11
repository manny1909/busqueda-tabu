import React from 'react'
import { MatrizTransporte } from '../models/models'
import '../App.css'

export const MejorSolucion = ({ mejorSolucion, titulo }: { mejorSolucion: MatrizTransporte, titulo: string }) => {
    return (
        <div className='mejor-solucion-asignacion '>
            <h2 className='text-center'>{titulo}</h2>
            <div className='d-flex justify-content-center'>
                <table>
                    <tbody>
                        {mejorSolucion.map((fila, i) => (
                            <tr key={i}>
                                {fila.map((celda, j) => (
                                    <td
                                        key={j}
                                        style={{
                                            border: "1px solid #ccc",
                                            padding: "8px",
                                            textAlign: "center"
                                        }}
                                    >
                                        <div>
                                            {celda.asignacion}
                                        </div>
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
