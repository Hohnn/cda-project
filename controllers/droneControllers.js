import DroneModel from '../models/droneModel.js'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// TEST !!! Affiche la page products.html à partir de la navbar
export const getDronesTest = (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build/product.html'))
}

export const addDrone = async (req, res) => {
    const drone = new DroneModel(req.body)
    await drone.save()
    res.send(drone)
}

export const getAllDrones = async (req, res) => {
    const drones = await DroneModel.find({})
    res.send(drones)
}

export const getDrone = async (req, res) => {
    const drone = await DroneModel.find({ _id: req.params.idDrone })
    res.send(drone)
}

export const updateDrone = async (req, res) => {
    const drone = await DroneModel.findByIdAndUpdate(req.params.idDrone, req.body)
    await drone.save()
    res.send(drone)
}

export const deleteDrone = async (req, res) => {
    const drone = await DroneModel.findByIdAndDelete(req.params.idDrone)
    if (!drone) {
        res.status(404).send('Aucun drone trouvé.')
    }
    res.status(200).send()
}