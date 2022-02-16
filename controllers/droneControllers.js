import DroneModel from '../models/droneModel.js'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)


export const addDrone = async (req, res) => {
    const drone = new DroneModel(req.body)
    await drone.save()
    res.status(201).send({
        message: 'Drone créé avec succès',
        drone: drone
    })
}

export const getAllDrones = async (req, res) => {
    const drones = await DroneModel.find({})
    res.send(drones)
}

export const getDrone = async (req, res) => {
    /* const drone = await DroneModel.find({ _id: req.params.idDrone })
    res.send(drone) */
}

export const getDroneByCategory = async (req, res) => {
    const drone = await DroneModel
        .find({ category_id: req.categoryProfile._id })
        .populate('category_id')
        .exec((err, drones) => {
            if (err || !drones) {
                return res.status(400).send({
                    message: 'Aucun drone trouvé'
                })
            } else {
                res.send(drones)
            }
        })
}

export const updateDrone = async (req, res) => {
    const drone = await DroneModel.findByIdAndUpdate(req.params.idDrone, req.body)
    await drone.save()
    res.send({
        message: 'Drone modifié avec succès',
        drone: drone
    })
}

export const deleteDrone = async (req, res) => {
    const drone = await DroneModel.findByIdAndDelete(req.params.idDrone)
    if (!drone) {
        res.status(404).send({
            message: 'Aucun drone trouvé.'
        })
    }
    res.status(200).send({
        message: 'Drone supprimé.'
    })
}

export const getDroneById = async (req, res, next, id) => {
    await DroneModel
        .findById(req.params.idDrone)
        .populate('category_id')
        .populate('processState_id')
        .exec((err, drone) => {
            if (err || !drone) {
                return res.status(400).send({
                    error: "Aucun drone trouvé"
                });
            }
            // on ajoute l'objet profile contenant les infos de l'utilisateur dans la requête
            req.droneProfile = drone;
            next();
            res.send(drone)
        });
};