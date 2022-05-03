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
            #swagger.security = [{
                "bearerAuth": []
            }]
    
            #swagger.responses[200] = { description: 'all users' }
            #swagger.responses[404] = { description: 'users not found' }
        */
    )
    .get('/drones', catchErrors(getAllDrones)
        /*
            #swagger.tags = ['The Drones']
            #swagger.description = 'Endpoint to get a drone.'
            
            #swagger.responses[200] = { description: 'all drones' }
            #swagger.responses[404] = { description: 'drones not found' }
        */
    )
    .get('/drones/:idDrone', catchErrors(getDrone)
        /*
            #swagger.tags = ['The Drones']
            #swagger.description = 'Endpoint to get a drone by id.'
            #swagger.parameters[idDrone] = { 
                in: 'path', 
                name: 'idDrone', 
                description: 'The id of the drone', 
                required: true, 
                type: 'string' 
            }
            #swagger.responses[200] = { description: 'drone found'},
            #swagger.responses[404] = { description: 'drone not found'}
        */
    )
    .get('/drones/categories/:idCategory', catchErrors(getDroneByCategory)
        /*
            #swagger.tags = ['The Drones']
            #swagger.description = 'Endpoint to get a drone category by id.'
            #swagger.parameters[idCategory] = { 
                in: 'path', 
                name: 'idCategory', 
                description: 'The id of The Categories', 
                required: true, 
                type: 'string' 
            }
            #swagger.responses[200] = { description: 'drone found'},
            #swagger.responses[404] = { description: 'drone not found'}
        */
    )
    .get('/categories', catchErrors(getAllCategories)
        /*
            #swagger.tags = ['The Categories']
            #swagger.description = 'Endpoint to get a category.'

            #swagger.responses[200] = { description: 'all categories' }
            #swagger.responses[404] = { description: 'categories not found' }
        */
    )
    .get('/categories/:idCategory', catchErrors(getCategory)
        /*
            #swagger.tags = ['The Categories']
            #swagger.description = 'Endpoint to get a category by id.'
            #swagger.parameters[idCategory] = { 
                in: 'path', 
                name: 'idCategory', 
                description: 'The ID of The category', 
                required: true, 
                type: 'string' 
            }
            #swagger.responses[200] = { description: 'category found'},
            #swagger.responses[404] = { description: 'category not found'}
        */
    )


    .post('/signup', passport.authenticate('signup', { session: false }),
    async (req, res, next) => {
        res.status(201).send({
            message: 'Inscription réussie',
            user: req.user
        })
    })
    
    
    .post('/login', (req, res, next) => {
        /*
            #swagger.tags = ['API root']
            #swagger.description = 'Endpoint to the API.'
            #swagger.parameters[email] = { 
            in: 'path', 
            name: 'email', 
            description: 'The email of the user', 
            required: true, 
            type: 'string' 
        }
            #swagger.parameters[password] = { 
            in: 'path', 
            name: 'password', 
            description: 'The password of the user', 
            required: true, 
            type: 'string' 
        }
      */
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
        })(req, res, next)}
    )


export default router