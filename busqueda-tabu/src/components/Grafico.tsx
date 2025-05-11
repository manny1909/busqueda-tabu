import React from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);
function Grafico({ historialCostos }: { historialCostos: number[] }) {
    const data = {
        labels: historialCostos.map((_, index) => `Iteración ${index + 1}`),
        datasets: [
            {
                label: "Costo",
                data: historialCostos,
                backgroundColor: "rgba(75,192,192,0.2)",
                borderColor: "rgba(75,192,192,1)",
                borderWidth: 2,
            },
        ],
    };

    return <>
        <h2 className="text-center">Gráfico de historial de Costos</h2>
        <Line data={data} />;
    </>
}

export default Grafico;