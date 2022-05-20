import OrderModel from '../models/orderModel.js'
import DroneModel from '../models/droneModel.js'
import AppError from '../utils/AppError.js'

export const addOrder = async (req, res) => {
    const order = new OrderModel(req.body)
    await order.save()
    res.status(201).send({
        message: 'Commande créée avec succès',
        order: order
    })
}

export const getAllOrders = async (req, res) => {
    const orders = await OrderModel.find({})
    res.send(orders)
}

export const getOrderById = async (req, res, next) => {
    const order = await OrderModel.findById(req.params.idOrder)
        .populate('user_id')
        .populate('drone_id')
        .exec((err, order) => {
            if (err) {
                return next(new AppError(`Erreur lors de la récupération de la commande ${req.params.idOrder}`, 400))
            }
            if (!order || order === null || order === undefined || order === '') {
                return next(new AppError(`Aucune commande ${req.params.idOrder} trouvée.`, 404))
            }
            res.send({
                message: `Commande ${req.params.idOrder} trouvée`,
                order: order
            })
        })
}

export const getOrdersByUserId = async (req, res, next) => {
    const order = await OrderModel.find({ user_id: req.params.idUser })
        .populate('drone_id')
        .exec((err, order) => {
            if (err) {
                return next(new AppError(`Erreur lors de la récupération de la commande ${req.params.idUser}`, 400))
            }
            if (!order || order === null || order === undefined || order === '' || order.length === 0) {
                return next(new AppError(`Aucune commandes trouvées de l'utilisateur ${req.params.idUser}`, 404))
            }
            res.status(200).send({
                message: `Commandes trouvées pour l'utilisateur ${req.params.idUser} `,
                order
            })
        })
}

export const updateOrder = async (req, res, next) => {
    const order = await OrderModel.findByIdAndUpdate(req.params.idOrder, req.body)
    if (!order || order === null || order === undefined || order === '') {
        return next(new AppError(`Aucune commande ${req.params.idOrder} trouvée.`, 404))
    }

    const drone = await DroneModel.findById(order.drone_id)
    if (!drone || drone === null || drone === undefined || drone === '') {
        return next(new AppError(`Aucun drone ${order.drone_id} trouvé.`, 404))
    }
    
    await drone.save()
    res.send({
        message: `Commande ${req.params.idOrder} modifiée avec succès`,
        order: order,
        drone: `Nouveau status du drone <${drone.name_d}> : ${drone.state}`
    })
}

export const deleteOrder = async (req, res, next) => {
    const order = await OrderModel.findByIdAndDelete(req.params.idOrder)
    if (!order) {
        return next(new AppError(`Aucune commande ${req.params.idOrder} trouvée.`, 404))
    }
    res.status(204).send({
        message: `Commande ${req.params.idOrder} supprimee.`
    })
}