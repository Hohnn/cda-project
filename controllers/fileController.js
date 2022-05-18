import AppError from '../utils/AppError.js'
import { gfs, gridfsBucket } from '../middleware/multer.js'
import mongoose from 'mongoose'

export const getImage = async (req, res, next) => {
	gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
		if (!file || file.length === 0 || file === undefined) {
			return next(new AppError('Aucun fichier trouvé.', 404))
		}
		if (file.contentType === 'image/jpeg' || file.contentType === 'image/png' || file.contentType === 'image/jpg' || file.contentType === 'image/gif') {
			// read output to browser
			const readstream = gridfsBucket.openDownloadStreamByName(file.filename)
			readstream.pipe(res)
		} else
			return next(new AppError('Ce fichier n\'est pas une image.', 404))
	})
}

export const uploadImage = async (req, res, next) => {
	if (!req.files) {
		return next(new AppError('Aucun fichier trouvé.', 404))
	}
	const file = req.files.file
	if (!file) {
		return next(new AppError('Aucun fichier trouvé.', 404))
	}
	if (!file.mimetype.startsWith('image')) {
		return next(new AppError('Ce fichier n\'est pas une image.', 404))
	}
	if (file.size > process.env.MAX_FILE_UPLOAD) {
		return next(new AppError('Le fichier est trop volumineux.', 404))
	}
	// Create a new write stream
	const writeStream = gridfsBucket.createWriteStream({
		filename: file.name,
		metadata: {
			owner: req.user._id
		}
	})
	// Pipe the request to the write stream
	file.pipe(writeStream)
	// Handle errors
	writeStream.on('error', (err) => {
		return next(new AppError('Une erreur est survenue lors de l\'upload du fichier.', 404))
	})
	// When the write stream is done
	writeStream.on('finish', () => {
		res.status(200).json({
			message: 'Fichier uploadé avec succès.',
			file: file.name
		})
	})
}


export const deleteImage = async (req, res, next) => {

	const obj_id = new mongoose.Types.ObjectId(req.params.id)

	gridfsBucket.delete(obj_id, (err, gridStore) => {
		if (err) {
			return next(new AppError('Erreur lors de la suppression du fichier.', 404))
		}
		res.json({ message: 'Fichier supprimé.' })
	})
}


