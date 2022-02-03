import OrderModel from '../models/orderModel.js'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)


export const addOrder = async (req, res) => {
    const order = new OrderModel(req.body)
    await order.save()
    res.send(order)
}

export const getAllOrders = async (req, res) => {
    const orders = await OrderModel.find({})
    res.send(orders)
}

export const getOrder = async (req, res) => {
   /*  const order = await OrderModel.find({ _id: req.params.idOrder })
    res.send(req.orderProfile) */
}

export const getOrderByCategory = async (req, res) => {
    const order = await OrderModel
    .find({ category_id: req.categoryProfile._id })
    .populate('category_id')
    res.send(order)
}

export const updateOrder = async (req, res) => {
    const order = await OrderModel.findByIdAndUpdate(req.params.idorder, req.body)
    await order.save()
    res.send(order)
}

export const deleteOrder = async (req, res) => {
    const order = await OrderModel.findByIdAndDelete(req.params.idorder)
    if (!order) {
        res.status(404).send('Aucun order trouvé.')
    }
    res.status(200).send()
}

export const getOrderById = (req, res, next, id) => {
    OrderModel
      .findById(id)
      .populate('user_id', '-password -__v')
      .populate('drone_id', '-__v')
      .populate('createdBy_o', '-password -__v')
      .populate('updateBy_o', '-password -__v')
      .exec()
      .then(order => {
        if(!order){
            return res.status(400).json({
                error: "Order not found"
            });
        }
        // on ajoute l'objet profile contenant les infos de l'utilisateur dans la requête
        req.orderProfile = order
        next()
        res.send(order)
        })

  };