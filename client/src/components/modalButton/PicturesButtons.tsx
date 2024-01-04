import {useState, useEffect} from 'react';
import ModalQuestions from '../modalQuestions/ModalQuestions';
import Image from 'react-bootstrap/Image';
import styled from 'styled-components';

interface Footballer {
	footballerId: string;
	footballerName: string;
	footballerPicture: string;
	createdAt: Date;
	updatedAt: Date;
}

interface ApiResponse {
	allFootballers: Footballer[];
}

const url = import.meta.env.VITE_API_URL

const PicturesButtons = () => {
	const [modalShow, setModalShow] = useState(false);
	const [selectedImageId, setSelectedImageId] = useState<string | null>(null);
	const [images, setImages] = useState<Footballer[]>([]);

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
			<div className="pictures">
				{images.map((image) => (
					<StyledImage key={image.footballerId} id={image.footballerId} src={image.footballerPicture} alt={image.footballerName} onClick={() => handleImageClick(image.footballerId)} />
					))}
			</div>

			<ModalQuestions show={modalShow} onHide={() => setModalShow(false)} selectedImageId={selectedImageId} />
		</ModalPicturesContainer>
	);
};

export default PicturesButtons;

const ModalPicturesContainer = styled.div`
	& .pictures {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(40%, 1fr));
		gap: 1rem;
		cursor: pointer;
	}
`;

const StyledImage = styled(Image)`
	width: 100%;
	height: 100%;
	border: 1px solid black;
	border-radius: 10px;
`;
