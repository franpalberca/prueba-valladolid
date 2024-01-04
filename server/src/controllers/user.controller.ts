import {prisma} from '../db/clientPrisma';
import { Request, Response } from "express";

export const createUser = async (req: Request, res: Response) => {
	const {email, name, picture} = req.body;

	try {
		// Check if all required fields are provided
		if (!name || !email) {
			return res.status(400).send({
				status: 'error',
				error: 'Name and email are required fields.',
			});
		}
		// Check if the email already exists in the database
		const emailExist = await prisma.user.findUnique({
			where: {email: email},
			// include: {
			// 	footballer: {
			// 		select: {
			// 			footballerName: true,
			// 		},
			// 	},
			// },
		});

		if (!emailExist) {
			// if the user does not exist in the database, create a new user
			const newUser = await prisma.user.create({
				data: {name: name, email: email, picture: picture},
				// include: {
				// 	footballer: {
				// 		select: {
				// 			footballerName: true,
				// 		},
				// 	},
				// },
			});
			return res.status(201).send({message: 'User created successfully!', user: newUser});
		} else {
			// If the email already exists, return the data of the existing user
			return res.status(200).send({
				status: 'success',
				message: 'User already exists.',
				user: emailExist,
			});
		}
	} catch (err) {
		console.error(err);
		return res.status(500).send({error: 'Internal server error'});
	}
};
