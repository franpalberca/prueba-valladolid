import {v2 as cloudinary} from 'cloudinary';
import config from '../config/config';

cloudinary.config({
	api_secret: config?.cloudinary?.cloudinary_api_secret,
	cloud_name: config?.cloudinary?.cloudinary_name,
	api_key: config?.cloudinary.cloudinary_api_key,
	secure: true,
});

export async function uploadImage(filePath: string) {
	try {
		const result = await cloudinary.uploader.upload(filePath, {folder: 'valladolid'});
		return result;
	} catch (error) {
		console.error('Error al subir la imagen a Cloudinary:', error);
		throw error;
	}
}

export const deleteImage = async (imageId: string) => {
	return await cloudinary.uploader.destroy(imageId);
};
