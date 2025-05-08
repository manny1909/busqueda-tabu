import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
function Grafico({ historialCostos }) {
  const data = {
    labels: historialCostos.map((_, index) => `Iteración ${index + 1}`),
    datasets: [
      {
        label: "Costos",
        data: historialCostos,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 2,
      },
    ],
  };

  return <Line data={data} />;
}

export default Grafico;
