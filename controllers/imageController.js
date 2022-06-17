import ImageModel from '../models/imageModel.js'
import AppError from '../utils/AppError.js'

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const getImages = async (req, res, next) => {
    const images = await ImageModel.find({})
    if (!images || images === null || images === undefined || images === '') {
        return next(new AppError(`Aucune images trouvées.`, 404))
    }
    res.send(
        images.map(image => {
            return {
                id_image: image._id,
                name_aka_drone_id: image.name,
                img: image.img.data,
                contentType: image.img.contentType
            }
        })
    )
}

export const getImage = async (req, res, next) => {

    const image = await ImageModel.findById(req.params.idImage)
    if (!image || image === null || image === undefined || image === '') {
        return next(new AppError(`Aucune images trouvées.`, 404))
    }
    res.send({
        id_image: image._id,
        name_aka_drone_id: image.name,
        img: image.img.data,
        contentType: image.img.contentType
    })

}

export const addImage = async (req, res, next) => {
    const obj = {
        name: req.file.originalname,
        img: {
            data: fs.readFileSync(req.file.path),
            contentType: req.file.mimetype
        }
    }
    const image = await ImageModel.create(obj)
    if (!image || image === null || image === undefined || image === '') {
        return next(new AppError(`Aucune images trouvées.`, 404))
    }
    res.status(201).send(image)
}


export const deleteImage = async (req, res, next) => {
    const image = await ImageModel.findByIdAndDelete(req.params.idImage)
    if (!image || image === null || image === undefined || image === '') {
        return next(new AppError(`Aucune images trouvées.`, 404))
    }
    res.status(200).send({
        message: `Image supprimée avec succès.`
    })
}