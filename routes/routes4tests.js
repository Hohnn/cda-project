import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import { catchErrors } from '../helpers.js'
import { getOrdersByUserId, addOrder, getAllOrders, updateOrder, deleteOrder, getOrderById } from '../controllers/orderControllers.js'
import { getRoles, getRole, addRole, updateRole, deleteRole } from '../controllers/roleControllers.js'
import { getUsers, getUser, addUser, deleteUser, updateUser } from '../controllers/userControllers.js'
import { getCategory, getAllCategories, addCategory, deleteCategory, updateCategory } from '../controllers/categoryControllers.js'
import { getDronesByCategory, getDrone, getAllDrones, addDrone, updateDrone, deleteDrone } from '../controllers/droneControllers.js'
import { deleteQrCode, getQrCode, addQrCode, getAllQrCodes } from "../controllers/qrCodeController.js"


const router = express.Router()
/*====================PRIVATE ROUTES======================*/
router
    .get('/users', catchErrors(getUsers))
    .get('/users/:idUser', catchErrors(getUser))
    .delete('/users/:idUser', catchErrors(deleteUser))
    .patch('/users/:idUser', catchErrors(updateUser))
    .post('/users', catchErrors(addUser))

    .delete('/qrcodes/:idQrCode', catchErrors(deleteQrCode))
    .post('/qrcodes', catchErrors(addQrCode))

    .delete('/drones/:idDrone', catchErrors(deleteDrone))
    .patch('/drones/:idDrone', catchErrors(updateDrone))
    .post('/drones', catchErrors(addDrone))

    .get('/orders/user/:idUser', catchErrors(getOrdersByUserId))
    .get('/orders', catchErrors(getAllOrders))
    .get('/orders/:idOrder', catchErrors(getOrderById))
    .post('/orders', catchErrors(addOrder))
    .patch('/orders/:idOrder', catchErrors(updateOrder))
    .delete('/orders/:idOrder', catchErrors(deleteOrder))

    .get('/roles', catchErrors(getRoles))
    .get('/roles/:idRole', catchErrors(getRole))
    .delete('/roles/:idRole', catchErrors(deleteRole))
    .patch('/roles/:idRole', catchErrors(updateRole))
    .post('/roles', catchErrors(addRole))

    .delete('/categories/:idCategory', catchErrors(deleteCategory))
    .patch('/categories/:idCategory', catchErrors(updateCategory))
    .post('/categories', catchErrors(addCategory))


    /*====================PUBLIC ROUTES======================*/
    .get('/drones', catchErrors(getAllDrones))
    .get('/drones/:idDrone', catchErrors(getDrone))
    .get('/drones/categories/:idCategory', catchErrors(getDronesByCategory))
    .get('/categories', catchErrors(getAllCategories))
    .get('/categories/:idCategory', catchErrors(getCategory))
    .get('/qrcodes', catchErrors(getAllQrCodes))
    .get('/qrcodes/:idQrCode', catchErrors(getQrCode))

export default router