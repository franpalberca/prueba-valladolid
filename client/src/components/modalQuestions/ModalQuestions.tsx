import { useState } from 'react';
import { ModalProps } from 'react-bootstrap/Modal';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

interface ModalQuestionsProps extends ModalProps {
  onHide: () => void;
}

const ModalQuestions: React.FC<ModalQuestionsProps> = (props) => {
  const questions = [
    'Determina tu fatiga',
    'Determina la calidad de tu sueño',
    'Determina tu dolor muscular general',
    'Determina tus niveles de estrés',
    'Determina tu estado anímico',
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [scores, setScores] = useState<number[]>(Array.from<number, number>({ length: questions.length }, () => 0));

  const handleRatingClick = (value: number) => {
    const newScores = [...scores];
    newScores[currentQuestionIndex] = value;
    setScores(newScores);
  };

  const handleNextClick = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Perform action for the last question (e.g., send data to backend)
      console.log('Sending data to backend:', scores);
      // Close the modal or perform any other action
      props.onHide();
    }
  };

  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Pregunta {currentQuestionIndex + 1}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>{questions[currentQuestionIndex]}</h4>
        <div>
          <label>Rate:</label>
          {[1, 2, 3, 4, 5].map((value) => (
            <FontAwesomeIcon
              key={value}
              icon={faStar}
              style={{
                color: scores[currentQuestionIndex] >= value ? '#e4e70d' : '#ccc',
                cursor: 'pointer',
                fontSize: '3em'
              }}
              onClick={() => handleRatingClick(value)}
            />
          ))}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleNextClick}>
          {currentQuestionIndex < questions.length - 1 ? 'Next' : 'Send'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalQuestions;

