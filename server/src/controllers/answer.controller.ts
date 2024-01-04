import {Request, Response} from 'express';
import {prisma} from '../db/clientPrisma';

export const createAnswer = async (req: Request, res: Response) => {
	const {footballerId} = req.params;
	const {answerOne, answerTwo, answerThree, answerFour, answerFive, date} = req.body;

	try {
		const footballerExist = await prisma.footballer.findUnique({
			where: {footballerId: footballerId},
		});

		if (!footballerExist) {
			return res.status(404).send({message: 'Footballer not found'});
		}

		const numericAnswerOne = isValidInteger(answerOne) ? parseInt(answerOne, 10) : 0;
		const numericAnswerTwo = isValidInteger(answerTwo) ? parseInt(answerTwo, 10) : 0;
		const numericAnswerThree = isValidInteger(answerThree) ? parseInt(answerThree, 10) : 0;
		const numericAnswerFour = isValidInteger(answerFour) ? parseInt(answerFour, 10) : 0;
		const numericAnswerFive = isValidInteger(answerFive) ? parseInt(answerFive, 10) : 0;

		const dateValue = isValidDate(date) ? new Date(date) : new Date();

		const newAnswer = await prisma.answer.create({
			data: {
				footballerId: footballerId,
				answerOne: numericAnswerOne,
				answerTwo: numericAnswerTwo,
				answerThree: numericAnswerThree,
				answerFour: numericAnswerFour,
				answerFive: numericAnswerFive,
				date: dateValue,
			},
		});

		return res.status(201).send({message: 'Answer created successfully!', answer: newAnswer});
	} catch (err) {
		console.error(err);
		return res.status(500).send({error: 'Internal server error'});
	}
};

function isValidInteger(value: any): boolean {
	return /^\d+$/.test(value);
}

function isValidDate(value: any): boolean {
	const dateRegex = /^\d{2}\.\d{2}\.\d{4}$/;
	if (!dateRegex.test(value)) {
		return false;
	}

	const [day, month, year] = value.split('.').map(Number);

	const isValid = !isNaN(day) && !isNaN(month) && !isNaN(year);

	return isValid;
}

export const getAnswerByFootballerId = async (req: Request, res: Response) => {
	const {footballerId} = req.params;

	try {
		const answers = await prisma.answer.findMany({
			where: {footballerId: footballerId},
		});

		return res.status(200).send({message: 'Answers retrieved successfully!', answers: answers});
	} catch (err) {
		console.error(err);
		return res.status(500).send({error: 'Internal server error'});
	}
};

export const deleteAnswerById = async (req: Request, res: Response) => {
	const {answerId} = req.params;
    console.log(answerId);

	try {
		const deleteAnswer = await prisma.answer.delete({
			where: {answerId: answerId},
		});

		if (!deleteAnswer) {
			return res.status(404).send({message: 'Answer not found'});
		}

		return res.status(200).send({message: 'Answer deleted successfully!'});
	} catch (err) {
		console.error(err);
		return res.status(500).send({error: 'Internal server error'});
	}
};
