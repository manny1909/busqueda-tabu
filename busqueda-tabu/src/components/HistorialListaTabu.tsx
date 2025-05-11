import React from 'react'
import { Movimiento } from '../models/models'

export const HistorialListaTabu = ({historialListaTabu}: {historialListaTabu: Movimiento[][][]}) => {
    return (
        <div>
            <h2 className='text-center'>Historial de lista tabú</h2>
            {historialListaTabu.map((listaTabu, iteracion) => (
                <div key={iteracion} style={{ marginBottom: "1rem" }}>
                    <h3>Iteración {iteracion + 1}</h3>
                    <table
                        style={{
                            borderCollapse: "collapse",
                            width: "100%",
                            marginTop: "0.5rem",
                            border: "1px solid #ccc"
                        }}
                    >
                        <thead>
                            <tr style={{ backgroundColor: "#f2f2f2" }}>
                                <th># Entrada</th>
                                <th>Movimientos</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listaTabu.map((movimientos, index) => (
                                <tr key={index}>
                                    <td>Entrada {index + 1}</td>
                                    <td>
                                        {movimientos.length > 0 ? (
                                            movimientos.map((m, i) => (
                                                <span key={i}>
                                                    (Fila {m.fila}, Columna {m.columna}, Diferencia: {m.diferencia})
                                                    {i < movimientos.length - 1 ? ", " : ""}
                                                </span>
                                            ))
                                        ) : (
                                            <em>(vacía)</em>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ))}
        </div>
    )
}
