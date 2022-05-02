import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import jwt from 'jsonwebtoken'
import passport from 'passport'
import { catchErrors } from '../helpers.js'
import {
    getRoles,
    getRole,
    addRole,
    updateRole,
    deleteRole
} from '../controllers/roleControllers.js'
import {
    getUsers,
    getUser,
    addUser,
    deleteUser,
    updateUser
} from '../controllers/userControllers.js'
import {
    getAllCategories,
    getCategory,
    addCategory,
    deleteCategory,
    updateCategory
} from '../controllers/categoryControllers.js'
import {
    addDrone,
    getAllDrones,
    updateDrone,
    deleteDrone,
    getDrone,
    getDroneByCategory
} from '../controllers/droneControllers.js'
import {
    addOrder,
    getAllOrders,
    updateOrder,
    deleteOrder,
    getOrderById
} from '../controllers/orderControllers.js'

const router = express.Router()


router
    .get('/users', catchErrors(getUsers)
        /*
             #swagger.tags = ['The Users']
             #swagger.description = 'Endpoint to get a user.'
    
             #swagger.responses[200] = { description: 'all users' }
             #swagger.responses[404] = { description: 'users not found' }
        */
    )

    .get('/users/:idUser', catchErrors(getUser)
        /*
        #swagger.tags = ['The Users']
        #swagger.description = 'Endpoint to get a user by id.'
        #swagger.parameters[idUser] = { 
            in: 'path', 
            name: 'idUser', 
            description: 'The id of the user', 
            required: true, 
            type: 'string' 
        }
        #swagger.responses[200] = { description: 'user found'},
        #swagger.responses[404] = { description: 'user not found'}
    */
    )
    .delete('/users/:idUser', catchErrors(deleteUser)
        /*
        #swagger.tags = ['The Users']
        #swagger.description = 'Endpoint to delete a user.'
        #swagger.parameters[idUser] = {
            in: 'path',
            name: 'idUser',
            description: 'The id of the user',
            required: true,
            type: 'string'
        }
        #swagger.responses[204] = { description: 'user deleted' }
        #swagger.responses[404] = { description: 'user not found' }
        */
    )
    .patch('/users/:idUser', catchErrors(updateUser)
        /* 
        #swagger.tags = ['The Users']
        #swagger.description = 'Endpoint to update a user by id.'

        #swagger.parameters['idUser'] = { 
           in: 'body',
           description: 'update a new user',
           schema: { $ref: "#/components/schemas/user" }
        }

        #swagger.responses[200] = { description: 'user updated' }
        #swagger.responses[404] = { description: 'user not found' }
        */
    )
    .post('/users', catchErrors(addUser)
        /*
        #swagger.tags = ['The Users']
        #swagger.description = 'Endpoint to add a new user.'
        
        #swagger.parameters['idUser'] = { 
            in: 'body', 
            description: 'add a new user', 
            schema: { $ref: "#/components/schemas/user" }
        }

        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/user"
                    }  
                }
            }
        }

        #swagger.responses[201] = { description: 'user added' }
        #swagger.responses[400] = { description: 'user already exists' }
        */
    )


    .patch('/drones/:idDrone', catchErrors(updateDrone))
    .get('/drones/:idDrone', catchErrors(getDrone))
    .post('/drones', catchErrors(addDrone))
    .get('/drones/categories/:idCategory', catchErrors(getDroneByCategory))
    .get('/drones', catchErrors(getAllDrones))
    .delete('/drones/:idDrone', catchErrors(deleteDrone))


    .patch('/roles/:idRole', catchErrors(updateRole))
    .post('/roles', catchErrors(addRole))
    .get('/roles/:idRole', catchErrors(getRole))
    .get('/roles', catchErrors(getRoles))
    .delete('/roles/:idRole', catchErrors(deleteRole))



    .get('/categories', catchErrors(getAllCategories))
    .post('/categories', catchErrors(addCategory))
    .get('/categories/:idCategory', catchErrors(getCategory))
    .patch('/categories/:idCategory', catchErrors(updateCategory))
    .delete('/categories/:idCategory', catchErrors(deleteCategory))


    .get('/orders', catchErrors(getAllOrders))
    .get('/orders/:idOrder', catchErrors(getOrderById))
    .post('/orders', catchErrors(addOrder))
    .patch('/orders/:idOrder', catchErrors(updateOrder))
    .delete('/orders/:idOrder', catchErrors(deleteOrder))


    .post('/signup', passport.authenticate('signup', { session: false }),
        async (req, res, next) => {
            res.status(201).send({
                message: 'Inscription réussie',
                user: req.user
            })
        })


    .post('/login', (req, res, next) => {
        passport.authenticate('login', async (err, user) => {
            try {
                if (err || !user) {
                    return res.status(400).send({
                        message: 'Une erreur est survenue lors de la connexion',
                        user: user
                    }
                    )
                }
                req.login(user, { session: false }, async err => {
                    if (err) { res.send(err) }

                    const body = {
                        _id: user._id,
                        email: user.email,
                        firstName_u: user.firstName_u,
                        lastName_u: user.lastName_u,
                        key_r: user.key_r,
                        company_u: user.company_u,
                        phone_u: user.phone_u,
                        address_u: user.address_u,
                        siret_u: user.siret_u
                    }
                    const token = jwt.sign({ user: body }, process.env.JWT_SECRET)

                    res.json({ token, user: body })
                })
            } catch (error) {
                return next(error)
            }
        })(req, res, next)
    })


export default router