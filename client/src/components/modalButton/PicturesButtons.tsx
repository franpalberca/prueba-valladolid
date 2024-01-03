import {useState} from 'react';
import ModalQuestions from '../modalQuestions/ModalQuestions';
import Image from 'react-bootstrap/Image';
import styled from 'styled-components';

const PicturesButtons = () => {
	const [modalShow, setModalShow] = useState(false);

	return (
		<ModalPicturesContainer>
			<div className="pictures" role="button" tabIndex={0} onClick={() => setModalShow(true)} onKeyDown={() => setModalShow(true)}>
				<StyledImage src="https://i.postimg.cc/Pq2sRBVK/masip.png" alt="Jordi Masip" />
				<StyledImage src="https://i.postimg.cc/FK9XG9p7/torres.png" alt="David Torres" />
				<StyledImage src="https://i.postimg.cc/htRBz878/moro.png" alt="Raúl Moro" />
				<StyledImage src="https://i.postimg.cc/T3jXryrz/andre.png" alt="Marcos André" />
			</div>

			<ModalQuestions show={modalShow} onHide={() => setModalShow(false)} />
		</ModalPicturesContainer>
	);
};

export default PicturesButtons;

const ModalPicturesContainer = styled.div`
	& .pictures {
		display: flex;
		justify-content: space-around;
		cursor: pointer;
	}
`;
const StyledImage = styled(Image)`
	width: 50vh;
	height: 60vh;
	border: 1px solid black;
	border-radius: 10px;
`;
