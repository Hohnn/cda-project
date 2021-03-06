import DroneModel from '../models/droneModel.js'
import AppError from '../utils/AppError.js'

export const addDrone = async (req, res, next) => {
    // if (req.user.key_r > 2) {
//        return next(new AppError(`Vous n'êtes // pas autorisé à effectuer cette action.`, 403))
//     }
    
    const drone = new DroneModel(req.body)
    await drone.save()
    if (!drone || drone === null || drone === undefined || drone === '') {
        return next(new AppError(`Erreur lors de la création du drone.`, 400))
    }
    res.status(201).send({
        message: 'Drone créé avec succès',
        drone: drone
    })
}


export const getAllDrones = async (req, res, next) => {
    const drones = await DroneModel.find({})
        .populate('name_cat')
    res.send(drones)
}

export const getDrone = async (req, res, next) => {
    const drone = await DroneModel.findById(req.params.idDrone)
        .populate('category_id')
        .exec((err, drone) => {
            if (!drone || drone === null || drone === undefined || drone === '') {
                return next(new AppError(`Aucun drone ${req.params.idDrone} trouvé.`, 404))
            }
            if (err) {
                return next(new AppError(`Erreur lors de la récupération du drone ${drone.name_d}.`, 400))
            }
            res.send(drone)
        })
}

export const getDronesByCategory = async (req, res, next) => {
    const drone = await DroneModel.find({ category_id: req.params.idCategory })
        .populate('category_id')
        .exec()
    if (!drone || drone.length === 0 || drone === null || drone === undefined || drone === '') {
        return next(new AppError(`Aucun drone trouvé pour la catégorie ${req.params.idCategory}.`, 404))
    }
    res.send(drone)
}

export const updateDrone = async (req, res, next) => {
    // if (req.user.key_r > 2) {
//        return next(new AppError(`Vous n'êtes // pas autorisé à effectuer cette action.`, 403))
//     }

    const drone = await DroneModel.findByIdAndUpdate(req.params.idDrone, req.body)
    if (!drone || drone.length === 0 || drone === null || drone === undefined || drone === '') {
        return next(new AppError(`Aucun drone ${req.params.idDrone} trouvé.`, 404))
    }
    await drone.save()
    res.send({
        message: `Drone ${drone.name_d} modifié avec succès`,
        drone: drone
    })
}

export const deleteDrone = async (req, res, next) => {
    // if (req.user.key_r > 2) {
//        return next(new AppError(`Vous n'êtes // pas autorisé à effectuer cette action.`, 403))
//     }

    const drone = await DroneModel.findByIdAndDelete(req.params.idDrone)
    if (!drone || drone.length === 0 || drone === null || drone === undefined || drone === '') {
        return next(new AppError(`Aucun drone ${req.params.idDrone} trouvé.`, 404))
    }
    res.status(200).send({
        message: `Drone ${drone.name_d} supprimé.`
    })
}
