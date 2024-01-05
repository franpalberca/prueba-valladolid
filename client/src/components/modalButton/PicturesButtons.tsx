import {useState, useEffect} from 'react';
import ModalQuestions from '../modalQuestions/ModalQuestions';
import Image from 'react-bootstrap/Image';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { STATISTICS } from '../../config/routes/paths';
import NavbarSite from '../navbar/Navbar';

export interface Footballer {
	footballerId: string;
	footballerName: string;
	footballerPicture: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface ApiResponse {
	allFootballers: Footballer[];
}

const url = import.meta.env.VITE_API_URL

const PicturesButtons = () => {
	const [modalShow, setModalShow] = useState(false);
	const [selectedImageId, setSelectedImageId] = useState<string | null>(null);
	const [images, setImages] = useState<Footballer[]>([]);
	const navigate = useNavigate()
    const handleStatisticsClick = () => {
        navigate(STATISTICS)
    }

	useEffect(() => {
		fetch(`${url}api/footballer`)
			.then((response) => response.json())
			.then((data: ApiResponse) => {
				return setImages(data || []);
			})
			.catch((error) => console.error('Error fetching images:', error));
	}, []);

	const handleImageClick = (id: string | null) => {
		setModalShow(true);
		setSelectedImageId(id);
	};

	return (
		<ModalPicturesContainer>
			<NavbarSite />
			<h1 className='title'>VALLADOLID FC</h1>
			<h4 className='subtitle'>SELECCIONE EL JUGADOR PARA RESPONDER CUESTIONARIO</h4>
			<div className="pictures">
				{images.map((image) => (
					<StyledImage key={image.footballerId} id={image.footballerId} src={image.footballerPicture} alt={image.footballerName} onClick={() => handleImageClick(image.footballerId)} />
					))}
			</div>
			<Button className='button' onClick={handleStatisticsClick}>Estadísticas</Button>

			<ModalQuestions show={modalShow} onHide={() => setModalShow(false)} selectedImageId={selectedImageId} />
		</ModalPicturesContainer>
	);
};

export default PicturesButtons;

const ModalPicturesContainer = styled.div`
background-color:#921B88;
    color: white;
    & .title{
        display: flex;
        align-items: center;
        justify-content: center;
    }
    & .subtitle{
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
