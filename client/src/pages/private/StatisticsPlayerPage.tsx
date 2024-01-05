import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {Image} from 'react-bootstrap';
import styled from 'styled-components';
import LinesChart from '../../chart/LinesChart.tsx'


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

const url = import.meta.env.VITE_API_URL;
const StatisticsPlayerPage = () => {
	const {footballerId} = useParams();
	const [playerInfo, setPlayerInfo] = useState<FootballerInfo | null>(null);
	console.log(playerInfo);

	useEffect(() => {
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

	return (
		<StatisticsStyles>
			<h1 className="title">Estadísticas del Jugador</h1>
            <div className='d-flex'>
                <div>
			<Image id={footballerId} src={playerInfo.Footballer.footballerPicture} alt={playerInfo.Footballer.footballerName} className="playerPicture" />
			<h2 className="subtitle">Nombre: {playerInfo.Footballer.footballerName}</h2>
            </div>
            <div className=''>
            <p className='m-2'><b>Ejemplo #1: </b>Gráfico de líneas básico</p>
            <div className='bg-light mx-auto px-2 border border-2 border-primary' style={{width: '450px', height: '230px'}}>
            <LinesChart />
            </div>
            </div>
            </div>
		</StatisticsStyles>
	);
};

export default StatisticsPlayerPage;

const StatisticsStyles = styled.div`
	background-color: #921b88;
	color: white;
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
`;
