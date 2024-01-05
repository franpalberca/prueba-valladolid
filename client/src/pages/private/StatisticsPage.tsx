import {useState, useEffect} from 'react';
import {ApiResponse, Footballer} from '../../components/modalButton/PicturesButtons';
import {useNavigate} from 'react-router-dom';
import {PRIVATE, STATISTICS} from '../../config/routes/paths';
import styled from 'styled-components';
import Image from 'react-bootstrap/Image';
import NavbarSite from '../../components/navbar/Navbar';
import { Button } from 'react-bootstrap';

const url = import.meta.env.VITE_API_URL;
const StatisticsPage = () => {
	const [images, setImages] = useState<Footballer[]>([]);
	const navigate = useNavigate();

	useEffect(() => {
		fetch(`${url}api/footballer`)
			.then((response) => response.json())
			.then((data: ApiResponse) => {
				return setImages(data || []);
			})
			.catch((error) => console.error('Error fetching images:', error));
	}, []);

	const handleImageClickStatistics = (id: string | null) => {
		navigate(`${STATISTICS}/${id}`);
	};
	const handlePrivateClick = () => {
        navigate(PRIVATE)
    }

	return (
		<ModalPicturesContainer>
			<NavbarSite />
			<h1 className="title">PÁGINA DE ESTADÍSTICAS</h1>
			<h4 className="subtitle">SELECCIONE EL JUGADOR</h4>
			<div className="pictures">
				{images.map((image) => (
					<StyledImage key={image.footballerId} id={image.footballerId} src={image.footballerPicture} alt={image.footballerName} onClick={() => handleImageClickStatistics(image.footballerId)} />
				))}
			</div>
			<Button className='button' onClick={handlePrivateClick}>Estadísticas</Button>
		</ModalPicturesContainer>
	);
};

export default StatisticsPage;

const ModalPicturesContainer = styled.div`
	background-color: #921b88;
	color: white;
	& .title {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	& .subtitle {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	& .pictures {
		margin-left: 20px;
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		grid-template-rows: 1fr;
		grid-column-gap: 0px;
		grid-row-gap: 0px;
		cursor: pointer;
	}
	& .button {
		margin-left: 100vh;
		margin-top: 5px;
		height: 10vh
	}
`;

const StyledImage = styled(Image)`
	width: 50vh;
	height: 60vh;
	border: 5px solid white;
	border-radius: 10px;
`;
