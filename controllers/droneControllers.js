import DroneModel from '../models/droneModel.js'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// TEST !!! Renvoie sur la page products
export const getDronesTest = (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build/product.html'))
}

// CREATE
export const addDrone = async (req, res) => {
    const drone = new DroneModel(req.body)
    await drone.save()
    res.send(drone)
}

// READ ALL DRONES
export const getAllDrones = async (req, res) => {
    const drones = await DroneModel.find({})
    res.send(drones)
}

// READ ONE DRONE
export const getDrone = async (req, res) => {
    const drone = await DroneModel.find({ _id: req.params.id })
    res.send(drone)
}

export const getDroneByCategory = async (req, res) => {
    const drone = await DroneModel
    .find({ category_id: req.categoryProfile._id })
    .populate('category_id')
    res.send(drone)
}

// UPDATE
export const updateDrone = async (req, res) => {
    const drone = await DroneModel.findByIdAndUpdate(req.params.id, req.body)
    await drone.save()
    res.send(drone)
}

// DELETE
export const deleteDrone = async (req, res) => {
    const drone = await DroneModel.findByIdAndDelete(req.params.id)
    if (!drone) {
        res.status(404).send('Aucune drone trouvé.')
    }
    res.status(200).send()
}