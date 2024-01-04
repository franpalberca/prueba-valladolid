import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

interface ModalQuestionsProps {
  onHide: () => void;
  selectedImageId: string | null;
}

const ModalQuestions: React.FC<ModalQuestionsProps> = (props) => {
  const questions = [
    'Determina tu fatiga',
    'Determina la calidad de tu sueño',
    'Determina tu dolor muscular general',
    'Determina tus niveles de estrés',
    'Determina tu estado anímico',
  ];

  const url = import.meta.env.VITE_API_URL;

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
      sendAnswersToBackend();
      props.onHide();
      resetState(); // Restablecer estados al cerrar el modal
    }
  };

  const sendAnswersToBackend = async () => {
    try {
      const response = await fetch(`${url}api/footballer/answer/${props.selectedImageId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          answerOne: scores[0],
          answerTwo: scores[1],
          answerThree: scores[2],
          answerFour: scores[3],
          answerFive: scores[4],
          date: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        console.log('Answers sent successfully!');
      } else {
        console.error('Failed to send answers. Status:', response.status);
      }
    } catch (error) {
      console.error('Error sending answers:', error);
    }
  };

  const resetState = () => {
    setCurrentQuestionIndex(0);
    setScores(Array.from<number, number>({ length: questions.length }, () => 0));
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

