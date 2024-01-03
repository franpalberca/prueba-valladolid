import {useState} from 'react';
import ModalQuestions from '../modalQuestions/ModalQuestions';
import Image from 'react-bootstrap/Image';
import styled from 'styled-components';

const PicturesButtons = () => {
	const [modalShow, setModalShow] = useState(false);
	const [selectedImageId, setSelectedImageId] = useState<string | null>(null);

	const images = [
		{id: 'masip', src: 'https://i.postimg.cc/Pq2sRBVK/masip.png', alt: 'Jordi Masip'},
		{id: 'torres', src: 'https://i.postimg.cc/FK9XG9p7/torres.png', alt: 'David Torres'},
		{id: 'moro', src: 'https://i.postimg.cc/htRBz878/moro.png', alt: 'Raúl Moro'},
		{id: 'andre', src: 'https://i.postimg.cc/T3jXryrz/andre.png', alt: 'Marcos André'},
	];

	const handleImageClick = (id: string | null) => {
		setModalShow(true);
		setSelectedImageId(id);
	};

	return (
		<ModalPicturesContainer>
			<div className="pictures">
				{images.map((image) => (
					<StyledImage key={image.id} id={image.id} src={image.src} alt={image.alt} onClick={() => handleImageClick(image.id)} />
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
