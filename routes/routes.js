import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import jwt from 'jsonwebtoken'
import passport from 'passport'
import { catchErrors } from '../helpers.js'
import {
    getUsers
} from '../controllers/userControllers.js'
import {
    getAllCategories,
    getCategory
} from '../controllers/categoryControllers.js'
import {
    getAllDrones,
    getDrone,
    getDroneByCategory
} from '../controllers/droneControllers.js'
import { getQrCode, addQrCode, getAllQrCodes } from "../controllers/qrCodeController.js"

const router = express.Router()

router
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
    .get('/qrcodes', catchErrors(getAllQrCodes)

        /*
            #swagger.tags = ['The QR Codes']
            #swagger.description = 'Endpoint to get all QR Codes.'

            #swagger.responses[200] = { description: 'all QR Codes' }
            #swagger.responses[404] = { description: 'QR Codes not found' }
        */
    )
    .get('/qrcode/:idQrCode', catchErrors(getQrCode)
        /*
                #swagger.tags = ['The QR Codes']
                #swagger.description = 'Endpoint to get a QR Code by id.'
                #swagger.parameters[idQrCode] = { 
                    in: 'path', 
                    name: 'idQrCode', 
                    description: 'The ID of The QR Codes', 
                    required: true, 
                    type: 'string' 
                }
                #swagger.responses[200] = { description: 'QR Code found'},
                #swagger.responses[404] = { description: 'QR Code not found'}
            */
    )
    .post('/qrcode', catchErrors(addQrCode)
        /*
                #swagger.tags = ['The QR Codes']
                #swagger.description = 'Endpoint to add a new QR Code.'
                #swagger.parameters['qrCode'] = { 
                    name: 'qrCode',
                    description: 'add a new QR Code',
                    schema: { $ref: "#/components/schemas/qrCode" }
                }
                #swagger.responses[200] = { description: 'QR Code created'},
                #swagger.responses[400] = { description: 'QR Code not created'}
                
                */
    )
    // #swagger.ignore = true
    .post('/signup', passport.authenticate('signup', { session: false }),
        async (req, res, next) => {
            res.status(201).send({
                message: 'Inscription réussie',
                user: req.user
            })
        })

   

    // #swagger.ignore = true
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

                    res.json({ token, user: body, message: 'Connexion réussie' })

                })
            } catch (error) {
                return next(error)
            }

        })(req, res, next)
    }
    )


export default router