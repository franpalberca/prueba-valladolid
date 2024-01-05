import {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {Button, Image} from 'react-bootstrap';
import styled from 'styled-components';
import LinesChart from '../../chart/LinesChart.tsx';
import { format } from 'date-fns';
import { STATISTICS } from '../../config/routes/paths.ts';

interface FootballerInfo {
	message: string;
	Footballer: {
		footballerId: string;
		footballerName: string;
		footballerPicture: string;
		createdAt: string;
		updatedAt: string;
	};
}
interface Answer {
    answerId: string;
    answerOne: number;
    answerTwo: number;
    answerThree: number;
    answerFour: number;
    answerFive: number;
    createdAt: string;
}

const url = import.meta.env.VITE_API_URL;
const StatisticsPlayerPage = () => {
	const {footballerId} = useParams();
	const [playerInfo, setPlayerInfo] = useState<FootballerInfo | null>(null);
	const [chartData, setChartData] = useState<any>({labels: [], datasets: []});
	const navigate = useNavigate()

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(`http://localhost:8080/api/footballer/answer/2/${footballerId}`);
				const data = await response.json();

				if (!data.answers || !Array.isArray(data.answers)) {
					console.error('Invalid data format:', data);
					return;
				}

				setChartData({
					labels: data && data?.answers?.map((answer: Answer) => format(new Date(answer.createdAt), 'dd-MM-yyyy')) || [],
					datasets: [
						{
							label: 'Fatiga',
							data: (data && data?.answers?.map((answer: Answer) => answer.answerOne)) || [],
							tension: 0.5,
							fill: true,
							borderColor: 'rgb(255, 99, 132)',
							backgroundColor: 'rgba(255, 99, 132, 0.5)',
							pointRadius: 5,
							pointBorderColor: 'rgba(255, 99, 132)',
							pointBackgroundColor: 'rgba(255, 99, 132)',
						},
						{
							label: 'Sueño',
							data: data && data?.answers?.map((answer: Answer) => answer.answerTwo),
							tension: 0.5,
							fill: true,
							borderColor: 'rgb(255, 99, 132)',
							backgroundColor: 'rgba(255, 99, 132, 0.5)',
							pointRadius: 5,
							pointBorderColor: 'rgba(255, 99, 132)',
							pointBackgroundColor: 'rgba(255, 99, 132)',
						},
						{
							label: 'Dolor Muscular',
							data: data && data?.answers?.map((answer: Answer) => answer.answerThree),
							tension: 0.5,
							fill: true,
							borderColor: 'rgb(255, 99, 132)',
							backgroundColor: 'rgba(255, 99, 132, 0.5)',
							pointRadius: 5,
							pointBorderColor: 'rgba(255, 99, 132)',
							pointBackgroundColor: 'rgba(255,99, 132)',
						},
						{
							label: 'Stress',
							data: data && data?.answers?.map((answer: Answer) => answer.answerFour),
							tension: 0.5,
							fill: true,
							borderColor: 'rgb(255, 99, 132)',
							backgroundColor: 'rgba(255, 99, 132, 0.5)',
							pointRadius: 5,
							pointBorderColor: 'rgba(255, 99, 132)',
							pointBackgroundColor: 'rgba(255,99, 132)',
						},
						{
							label: 'Estado anímico',
							data: data && data?.answers?.map((answer: Answer) => answer.answerFive),
							tension: 0.5,
							fill: true,
							borderColor: 'rgb(255, 99, 132)',
							backgroundColor: 'rgba(255, 99, 132, 0.5)',
							pointRadius: 5,
							pointBorderColor: 'rgba(255, 99, 132)',
							pointBackgroundColor: 'rgba(255,99, 132)',
						},
					],
				});
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};

		fetchData();

		fetch(`${url}api/footballer/${footballerId}`)
			.then((response) => response.json())
			.then((data: FootballerInfo) => {
				return setPlayerInfo(data || []);
			})
			.catch((error) => console.error('Error fetching images:', error));
	}, [footballerId]);

	if (!playerInfo) {
		return <div>Cargando...</div>;
	}

	const handleBack = () => {
        navigate(STATISTICS)
    }

	return (
		<StatisticsStyles>
			<h1 className="title">Estadísticas del Jugador</h1>
			<div className="d-flex all_info">
				<div>
					<Image id={footballerId} src={playerInfo.Footballer.footballerPicture} alt={playerInfo.Footballer.footballerName} className="playerPicture" />
					<h2 className="subtitle">Nombre: {playerInfo.Footballer.footballerName}</h2>
				</div>
				<div className="grafic">
					<div className="bg-light mx-auto px-2 border border-2 border-primary" style={{width: '600px', height: '310px'}}>
						<LinesChart chartData={chartData} />
					</div>
				</div>
			</div>
			<Button className='back_button' onClick={handleBack}>Ir atrás</Button>
		</StatisticsStyles>
	);
};

export default StatisticsPlayerPage;

const StatisticsStyles = styled.div`
	background-color: #921b88;
	color: white;
	& .all_info {
		margin-left: 15vh;
	}
	& .title {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	& .playerPicture {
		width: 50vh;
		height: 60vh;
	}
	& .subtitle {
		margin: 15px;
	}
	& .grafic{
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin-left: 8vh;
	}
	& .back_button {
		margin-left: 100vh;
		height: 10vh
	}
`;
