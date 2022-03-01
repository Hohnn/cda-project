import OrderModel from '../models/orderModel.js'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)


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

export const getOrderById = async (req, res) => {
  const order = await OrderModel.findById(req.params.idOrder )
  .populate('user_id')
  .populate('drone_id')
    .exec((err, order) => {
        if(err) {
            res.status(400).send({
                message: `Erreur lors de la récupération de la commande ${req.params.idOrder}`,
                error: err
                })
            return
        }
        if(!order || order === null || order === undefined || order === '') {
            res.status(404).send({
                message: `commande ${req.params.idOrder} non trouvée.`
            })
            return
        }
        res.send({ 
            message: `Commande ${req.params.idOrder} trouvée`, 
            order })
    })
}


export const updateOrder = async (req, res, next) => {
    const order = await OrderModel.findByIdAndUpdate(req.params.idOrder, req.body)
    if(!order) {
        res.status(404).send({
            message: `Commande ${req.params.idOrder} non trouvée.`
        })
    }
    await order.save()
    res.send({
        message: `Commande ${req.params.idOrder} modifiée avec succès`,
        order: order
    })
    next()
}

export const deleteOrder = async (req, res) => {
    const order = await OrderModel.findByIdAndDelete(req.params.idOrder)
    if (!order) {
        res.status(404).send({ message: `Commande ${req.params.idOrder} non trouvée.`})
    }
    res.status(200).send({ message: `Commande ${req.params.idOrder} supprimee.`,
    order: order})
}