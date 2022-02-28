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
                message: 'Erreur lors de la récupération de la commande',
                error: err
                })
        }
        if(!order) {
            res.status(404).send({
                message: 'Aucune commande trouvée.'
            })
        }
        res.send(order)
    })
}


export const updateOrder = async (req, res) => {
    const order = await OrderModel.findByIdAndUpdate(req.params.idOrder, req.body)
    await order.save()
    if(!order) {
        res.status(404).send({
            message: 'Aucune commande trouvée.'
        })
    }
    res.send({
        message: 'Commande modifiée avec succès',
        order: order
    })
}

export const deleteOrder = async (req, res) => {
    const order = await OrderModel.findByIdAndDelete(req.params.idorder)
    if (!order) {
        res.status(404).send('Aucun order trouvé.')
    }
    res.status(200).send()
}