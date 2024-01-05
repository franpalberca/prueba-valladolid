import { Line } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const dias = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const fatiga = [4, 5, 3, 4, 2, 4, 1, 1]
const mydata = {
    labels: dias,
    datasets: [
        {
            label: 'Fatiga',
            data: fatiga,
            tension: 0.5,
            fill: true,
            borderColor: 'rgb(255, 99, 132',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            pointRadius: 5,
            pointBorderColor: 'rgba(255, 99, 132)',
            pointBackgroundColor: 'rgba(255,99, 132)'
        }
    ]
}
const myoptions = {
    scales: {
        y: {
            min: 0
        },
        x: {
            ticks: {
                color: 'blue'
            }
        }
    },
    plugins: {
        legend: {
            display: false
        }
    }
}

export default function LinesChart() {
    return <Line data={mydata} options={myoptions} />
}
