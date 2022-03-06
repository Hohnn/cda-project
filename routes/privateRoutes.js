import express from "express"
import { addOrder, getAllOrders, updateOrder, deleteOrder, getOrderById } from '../controllers/orderControllers.js'
import { catchErrors } from '../helpers.js'
import { getRoles, getRole, addRole, updateRole, deleteRole } from '../controllers/roleControllers.js'
import { getUsers, getUser, addUser, deleteUser, updateUser } from '../controllers/userControllers.js'
import { getAllCategories, getCategory, addCategory, deleteCategory, updateCategory } from '../controllers/categoryControllers.js'
import { getAllProcessStates, getProcessState, addProcessState, updateProcessState, deleteProcessState } from '../controllers/processStateControllers.js'
import { addDrone, getAllDrones, updateDrone, deleteDrone, getDrone, getDroneByCategory } from '../controllers/droneControllers.js'

const router = express.Router()

router.get('/secret', (req, res) => {
    res.json({
        message: 'This is a secret message',
        user: req.user,
        token: req.query.token
    })
})
    .get('/users', catchErrors(getUsers))
    .get('/users/:idUser', catchErrors(getUser))
    .delete('/users/:idUser', catchErrors(deleteUser))
    .patch('/users/:idUser', catchErrors(updateUser))
    .post('/users', catchErrors(addUser))

    .patch('/roles/:idRole', catchErrors(updateRole))
    .post('/roles', catchErrors(addRole))
    .get('/roles/:idRole', catchErrors(getRole))
    .get('/roles', catchErrors(getRoles))
    .delete('/roles/:idRole', catchErrors(deleteRole))

    .get('/orders', catchErrors(getAllOrders))
    .get('/orders/:idOrder', catchErrors(getOrderById))
    .post('/orders', catchErrors(addOrder))
    .patch('/orders/:idOrder', catchErrors(updateOrder))
    .delete('/orders/:idOrder', catchErrors(deleteOrder))

    .get('/ps', catchErrors(getAllProcessStates))
    .post('/ps', catchErrors(addProcessState))
    .get('/ps/:idPs', catchErrors(getProcessState))
    .patch('/ps/:idPs', catchErrors(updateProcessState))
    .delete('/ps/:idPs', catchErrors(deleteProcessState))

export default router