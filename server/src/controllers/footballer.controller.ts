import {Request, Response} from 'express';
import {prisma} from '../db/clientPrisma';
import fs from 'fs-extra';
import {uploadImage} from '../utils/cloudinary';

export const createFootballer = async (req: Request, res: Response) => {
	const {footballerName} = req.body;
	try {
		if (!footballerName || !(req.files as any)?.footballerPicture) {
			return res.status(400).send({
				status: 'error',
				error: 'FootballerName, FootballerPicture are required fields.',
			});
		}

		// Check if the footballer already exists in the database
		const footballerExist = await prisma.footballer.findMany({
			where: {footballerName: footballerName},
		});

		if (footballerExist.length === 0) {
			// if the footballer does not exist in the database, create a new footballer
			if (!req.files?.footballerPicture) {
				return res.status(400).json({error: 'Image is missing'});
			}
			const imageVerification = req.files?.footballerPicture;

			if ('tempFilePath' in imageVerification) {
				const upload = await uploadImage(imageVerification.tempFilePath);
				await fs.unlink(imageVerification.tempFilePath);

				const newFootballer = await prisma.footballer.create({
					data: {footballerName, footballerPicture: upload.secure_url},
				});
				return res.status(201).send({message: 'Footballer created successfully!', footballer: newFootballer});
			}
		} else {
			// If the footballer already exists, return the data of the existing footballer
			return res.status(200).send({
				status: 'success',
				message: 'Footballer already exists.',
				footballer: footballerExist,
			});
		}
	} catch (err) {
		console.error(err);
		return res.status(500).send({error: err});
	}
};

export const getAllFootballers = async (req: Request, res: Response) => {
	try {
		console.log('entra');
		const allFootballers = await prisma.footballer.findMany();
		console.log('allFootballers:', allFootballers);
		return res.status(200).json(allFootballers);
	} catch (err) {
		console.error(err);
		return res.status(500).send({error: 'Internal server error'});
	}
};

export const getFootballerById = async (req: Request, res: Response) => {
	const {id} = req.params;
    console.log(req.params)

	try {
		const footballerById = await prisma.footballer.findUnique({
			where: {footballerId: id}
		});

		return res.status(200).send({message: 'Footballer gotten successfully!', Footballer: footballerById});
	} catch (err) {
		console.error(err);
		return res.status(500).send({error: 'Internal server error'});
	}
};

export const deleteFootballerById = async (req: Request, res: Response) => {
	const {id} = req.params;

	try {
		const deleteFootballer = await prisma.footballer.delete({
			where: {footballerId: id},
		});

		if (!deleteFootballer) {
			return res.status(404).send({message: 'Footballer not found'});
		}

		return res.status(200).send({message: 'Footballer deleted successfully!'});
	} catch (err) {
		console.error(err);
		return res.status(500).send({error: 'Internal server error'});
	}
};
