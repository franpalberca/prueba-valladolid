import {Line} from 'react-chartjs-2';
import {Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

interface LinesChartProps {
	chartData: any;
}

const LinesChart: React.FC<LinesChartProps> = ({chartData}) => {

    const myoptions = {
        scales: {
            y: {
                min: 0,
            },
            x: {
                ticks: {
                    color: 'green',
                },
            },
        },
        plugins: {
            legend: {
                display: true,
            },
        },
    };
	return <Line data={chartData} options={myoptions} />;
};

export default LinesChart;
