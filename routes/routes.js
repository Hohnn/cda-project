import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import jwt from 'jsonwebtoken'
import passport from 'passport'
import AppError from '../utils/AppError.js'
import { catchErrors } from '../helpers.js'
import upload from '../utils/multer.js'
import { getOrdersByUserId, addOrder, getAllOrders, updateOrder, deleteOrder, getOrderById } from '../controllers/orderControllers.js'
import { getRoles, getRole, addRole, updateRole, deleteRole } from '../controllers/roleControllers.js'
import { getUsers, getUser, addUser, deleteUser, updateUser } from '../controllers/userControllers.js'
import { getCategory, getAllCategories, addCategory, deleteCategory, updateCategory } from '../controllers/categoryControllers.js'
import { getDronesByCategory, getDrone, getAllDrones, addDrone, updateDrone, deleteDrone } from '../controllers/droneControllers.js'
import { deleteQrCode, getQrCode, addQrCode, getAllQrCodes } from "../controllers/qrCodeController.js"
import { getImages, getImage, addImage, deleteImage } from "../controllers/imageController.js"

const auth = {
    signup: passport.authenticate('signup', { session: false }),
    jwt: passport.authenticate('jwt', { session: false })
}

const router = express.Router()

router
    //#swagger.ignore = true
    .get('/images', catchErrors(getImages))
    //#swagger.ignore = true
    .get('/images/:idDrone', catchErrors(getImage))
    //#swagger.ignore = true
    .post('/images/:idDrone', auth.jwt, upload.single('image'), catchErrors(addImage))
    //#swagger.ignore = true
    .delete('/images/:idImage', auth.jwt, catchErrors(deleteImage))

    
    .get('/users', auth.jwt, catchErrors(getUsers)
        /*
            #swagger.tags = ['The Users']
            #swagger.description = 'Endpoint to get a user.'
            #swagger.security = [{
                "bearerAuth": []
            }]
        
            #swagger.responses[200] = { description: 'OK' }
            #swagger.responses[401] = { description: 'NOT AUTHORIZED' }
            #swagger.responses[403] = { description: 'FORBIDDEN' }
            #swagger.responses[404] = { description: 'NOT FOUND' }
            */
    )
    .get('/users/:idUser', auth.jwt, catchErrors(getUser)
        /*
            #swagger.tags = ['The Users']
            #swagger.description = 'Endpoint to get a user by id.'
            #swagger.security = [{
                "bearerAuth": []
            }]
            #swagger.parameters[idUser] = { 
                in: 'path', 
                name: 'idUser', 
                description: 'The id of the user', 
                required: true, 
                type: 'string' 
            }
            #swagger.responses[200] = { description: 'OK' }
            #swagger.responses[401] = { description: 'NOT AUTHORIZED' }
            #swagger.responses[403] = { description: 'FORBIDDEN' }
            #swagger.responses[404] = { description: 'NOT FOUND' }
        */
    )
    .delete('/users/:idUser', auth.jwt, catchErrors(deleteUser)
        /*
            #swagger.tags = ['The Users']
            #swagger.description = 'Endpoint to delete a user.'
            #swagger.security = [{
                "bearerAuth": []
            }]
            #swagger.parameters[idUser] = {
                in: 'path',
                name: 'idUser',
                description: 'The id of the user',
                required: true,
                type: 'string'
            }
            #swagger.responses[204] = { description: 'DELETED' }
            #swagger.responses[401] = { description: 'NOT AUTHORIZED' }
            #swagger.responses[403] = { description: 'FORBIDDEN' }
            #swagger.responses[404] = { description: 'NOT FOUND' }
        */
    )
    .patch('/users/:idUser', auth.jwt, catchErrors(updateUser)
        /* 
        #swagger.tags = ['The Users']
        #swagger.description = 'Endpoint to update a user by id.'
        #swagger.security = [{
                "bearerAuth": []
            }]
        #swagger.parameters['idUser'] = { 
           in: 'body',
           description: 'update a new user',
           schema: { $ref: "#/components/schemas/user" }
        }
            #swagger.responses[200] = { description: 'OK' }
            #swagger.responses[401] = { description: 'NOT AUTHORIZED' }
            #swagger.responses[403] = { description: 'FORBIDDEN' }
            #swagger.responses[404] = { description: 'NOT FOUND' }
        */
    )
    .post('/users', auth.jwt, catchErrors(addUser)
        /*
        #swagger.tags = ['The Users']
        #swagger.description = 'Endpoint to add a new user.'
        #swagger.security = [{
                "bearerAuth": []
            }]
        #swagger.parameters['idUser'] = { 
            in: 'body',
            required: true,
            description: 'add a new user', 
            schema: { $ref: "#/components/schemas/user" }
        }
            #swagger.responses[201] = { description: 'OK' }
            #swagger.responses[401] = { description: 'NOT AUTHORIZED' }
            #swagger.responses[403] = { description: 'FORBIDDEN' }
            #swagger.responses[404] = { description: 'NOT FOUND' }
        */
    )
    .delete('/qrcodes/:idQrCode', auth.jwt, catchErrors(deleteQrCode)
        /*
            #swagger.tags = ['The QR Codes']
            #swagger.description = 'Endpoint to delete a QR Code.'
            #swagger.security = [{
                "bearerAuth": []
            }]
            #swagger.parameters['idQrCode'] = { 
                name: 'idQrCode',
                description: 'delete an existing QR Code'
            }
            #swagger.responses[204] = { description: 'DELETED' }
            #swagger.responses[401] = { description: 'NOT AUTHORIZED' }
            #swagger.responses[403] = { description: 'FORBIDDEN' }
            #swagger.responses[404] = { description: 'NOT FOUND' }
                */
    )
    .post('/qrcodes', auth.jwt, catchErrors(addQrCode)
        /*
            #swagger.tags = ['The QR Codes']
            #swagger.description = 'Endpoint to add a new QR Code.'
            #swagger.security = [{
                "bearerAuth": []
            }]
            #swagger.parameters['qrCode'] = { 
                name: 'qrCode',
                required: true,
                description: 'add a new QR Code',
                schema: { $ref: "#/components/schemas/qrCode" }
            }
            #swagger.responses[201] = { description: 'CREATED' }
            #swagger.responses[401] = { description: 'NOT AUTHORIZED' }
            #swagger.responses[403] = { description: 'FORBIDDEN' }
            #swagger.responses[404] = { description: 'NOT FOUND' }
                */
    )
    .delete('/drones/:idDrone', auth.jwt, catchErrors(deleteDrone)
        /*
            #swagger.tags = ['The Drones']
            #swagger.description = 'Endpoint to delete a drone.'
            #swagger.security = [{
                "bearerAuth": []
            }]
            #swagger.parameters[idDrone] = {
                in: 'path',
                name: 'idDrone',
                description: 'The id of the drone',
                required: true,
                type: 'string'
            }
            #swagger.responses[204] = { description: 'DELETED' }
            #swagger.responses[401] = { description: 'NOT AUTHORIZED' }
            #swagger.responses[403] = { description: 'FORBIDDEN' }
            #swagger.responses[404] = { description: 'NOT FOUND' }
        */
    )
    .patch('/drones/:idDrone', auth.jwt, catchErrors(updateDrone)
        /* 
            #swagger.tags = ['The Drones']
            #swagger.description = 'Endpoint to update a drone by id.'
            #swagger.security = [{
                "bearerAuth": []
            }]
            #swagger.parameters['idDrone'] = { 
                in: 'body',
                description: 'update a new drone',
                schema: { $ref: "#/components/schemas/drone" }
            }
        
            #swagger.responses[200] = { description: 'OK' }
            #swagger.responses[401] = { description: 'NOT AUTHORIZED' }
            #swagger.responses[403] = { description: 'FORBIDDEN' }
            #swagger.responses[404] = { description: 'NOT FOUND' }
        */
    )

    .post('/drones', auth.jwt, catchErrors(addDrone)
        /*
            #swagger.tags = ['The Drones']
            #swagger.description = 'Endpoint to add a new drone.'
            #swagger.security = [{
                "bearerAuth": []
            }]
            #swagger.parameters['Drone'] = { 
                in: 'body', 
                description: 'add a new drone', 
                schema: { $ref: "#/components/schemas/drone" }
            }
        
            #swagger.responses[201] = { description: 'CREATED' }
            #swagger.responses[401] = { description: 'NOT AUTHORIZED' }
            #swagger.responses[403] = { description: 'FORBIDDEN' }
            #swagger.responses[404] = { description: 'NOT FOUND' }
        */
    )
    .get('/orders/user/:idUser', auth.jwt, catchErrors(getOrdersByUserId)
        /*
            #swagger.tags = ['The Orders']
            #swagger.description = 'Endpoint to get all orders by user id.'
            #swagger.security = [{
                "bearerAuth": []
            }]
            #swagger.responses[200] = { description: 'OK' }
            #swagger.responses[400] = { description: 'ERROR' }
            #swagger.responses[401] = { description: 'NOT AUTHORIZED' }
            #swagger.responses[403] = { description: 'FORBIDDEN' }
            #swagger.responses[404] = { description: 'NOT FOUND' }
        */
    )
    .get('/roles', auth.jwt, catchErrors(getRoles)
        /*
            #swagger.tags = ['The Roles']
            #swagger.description = 'Endpoint to get a role.'
            #swagger.security = [{
                "bearerAuth": []
            }]
            #swagger.responses[200] = { description: 'OK' }
            #swagger.responses[401] = { description: 'NOT AUTHORIZED' }
            #swagger.responses[403] = { description: 'FORBIDDEN' }
            #swagger.responses[404] = { description: 'NOT FOUND' }
        */
    )
    .get('/roles/:idRole', auth.jwt, catchErrors(getRole)
        /*
            #swagger.tags = ['The Roles']
            #swagger.description = 'Endpoint to get a role by id.'
            #swagger.security = [{
                "bearerAuth": []
            }]
            #swagger.parameters[idRole] = { 
                in: 'path', 
                name: 'idRole', 
                description: 'The id of the roles', 
                required: true, 
                type: 'string' 
            }
            #swagger.responses[200] = { description: 'OK' }
            #swagger.responses[401] = { description: 'NOT AUTHORIZED'}
            #swagger.responses[403] = { description: 'FORBIDDEN' }
            #swagger.responses[404] = { description: 'NOT FOUND' }
        */
    )
    .delete('/roles/:idRole', auth.jwt, catchErrors(deleteRole)
        /*
            #swagger.tags = ['The Roles']
            #swagger.description = 'Endpoint to delete a role.'
            #swagger.security = [{
                "bearerAuth": []
            }]
            #swagger.parameters[idRole] = {
                in: 'path',
                name: 'idRole',
                description: 'The id of the roles',
                required: true,
                type: 'string'
            }
            #swagger.responses[200] = { description: 'OK' }
            #swagger.responses[401] = { description: 'NOT AUTHORIZED' }
            #swagger.responses[403] = { description: 'FORBIDDEN' }
            #swagger.responses[404] = { description: 'NOT FOUND' }
        */
    )
    .patch('/roles/:idRole', auth.jwt, catchErrors(updateRole)
        /* 
            #swagger.tags = ['The Roles']
            #swagger.description = 'Endpoint to update a role by id.'
            #swagger.security = [{
                "bearerAuth": []
            }]
            #swagger.parameters['Role'] = { 
               in: 'body',
               description: 'update a new role',
               schema: { $ref: "#/components/schemas/role" }
            }
        
            #swagger.responses[200] = { description: 'OK' }
            #swagger.responses[401] = { description: 'NOT AUTHORIZED' }
            #swagger.responses[403] = { description: 'FORBIDDEN' }
            #swagger.responses[404] = { description: 'NOT FOUND' }
        */
    )
    .post('/roles', auth.jwt, catchErrors(addRole)
        /*
            #swagger.tags = ['The Roles']
            #swagger.description = 'Endpoint to add a new role.'
            #swagger.security = [{
                "bearerAuth": []
            }]
            #swagger.parameters['Role'] = { 
                in: 'body', 
                description: 'add a new role', 
                schema: { $ref: "#/components/schemas/role" }
            }
        
            #swagger.responses[200] = { description: 'OK' }
            #swagger.responses[401] = { description: 'NOT AUTHORIZED' }
            #swagger.responses[403] = { description: 'FORBIDDEN' }
            #swagger.responses[404] = { description: 'NOT FOUND' }
            */
    )
    .delete('/categories/:idCategory', auth.jwt, catchErrors(deleteCategory)
        /*
            #swagger.tags = ['The Categories']
            #swagger.description = 'Endpoint to delete a category.'
            #swagger.security = [{
                "bearerAuth": []
            }]
            #swagger.parameters[idCategory] = {
                in: 'path',
                name: 'idCategory',
                description: 'The id of the category',
                required: true,
                type: 'string'
            }
            #swagger.responses[204] = { description: 'DELETED' }
            #swagger.responses[401] = { description: 'NOT AUTHORIZED' }
            #swagger.responses[403] = { description: 'FORBIDDEN' }
            #swagger.responses[404] = { description: 'NOT FOUND' }
        */
    )
    .patch('/categories/:idCategory', auth.jwt, catchErrors(updateCategory)
        /* 
            #swagger.tags = ['The Categories']
            #swagger.description = 'Endpoint to update a category by id.'
            #swagger.security = [{
                "bearerAuth": []
            }]
            #swagger.parameters['Category'] = { 
               in: 'body',
               description: 'update an existing category',
               schema: { $ref: "#/components/schemas/categories" }
            }
        
            #swagger.responses[200] = { description: 'OK' }
            #swagger.responses[401] = { description: 'NOT AUTHORIZED' }
            #swagger.responses[403] = { description: 'FORBIDDEN' }
            #swagger.responses[404] = { description: 'NOT FOUND' }
        */
    )
    .post('/categories', auth.jwt, catchErrors(addCategory)
        /*
            #swagger.tags = ['The Categories']
            #swagger.description = 'Endpoint to add a new category.'
            #swagger.security = [{
                "bearerAuth": []
            }]
            #swagger.parameters['Category'] = { 
                in: 'body', 
                description: 'add a new category', 
                schema: { $ref: "#/components/schemas/categories" }
            }
        
            #swagger.responses[201] = { description: 'CREATED' }
            #swagger.responses[401] = { description: 'NOT AUTHORIZED' }
            #swagger.responses[403] = { description: 'FORBIDDEN' }
            #swagger.responses[404] = { description: 'NOT FOUND' }
        */
    )
    .get('/orders', auth.jwt, catchErrors(getAllOrders)
        /*
            #swagger.tags = ['The Orders']
            #swagger.description = 'Endpoint to get a order.'
            #swagger.security = [{
                "bearerAuth": []
            }]
            #swagger.responses[200] = { description: 'OK' }
            #swagger.responses[401] = { description: 'NOT AUTHORIZED' }
            #swagger.responses[403] = { description: 'FORBIDDEN' }
            #swagger.responses[404] = { description: 'NOT FOUND' }
        */
    )
    .get('/orders/:idOrder', auth.jwt, catchErrors(getOrderById)
        /*
            #swagger.tags = ['The Orders']
            #swagger.description = 'Endpoint to get a order by id.'
            #swagger.parameters[idOrder] = { 
                in: 'path', 
                name: 'idOrder', 
                description: 'The id of the order', 
                required: true, 
                type: 'string' 
            }
            #swagger.security = [{
                "bearerAuth": []
            }]
            #swagger.responses[200] = { description: 'OK' }
            #swagger.responses[401] = { description: 'NOT AUTHORIZED' }
            #swagger.responses[403] = { description: 'FORBIDDEN' }
            #swagger.responses[404] = { description: 'NOT FOUND' }
        */
    )
    .post('/orders', catchErrors(addOrder)
        /*
            #swagger.tags = ['The Orders']
            #swagger.description = 'Endpoint to add a new order.'
            #swagger.security = [{
                "bearerAuth": []
            }]
            #swagger.parameters['Order'] = { 
                in: 'body', 
                description: 'add a new order', 
                schema: { $ref: "#/components/schemas/order" }
            }
        
            #swagger.requestBody = {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/order"
                        }  
                    }
                }
            }
        
            #swagger.responses[201] = { description: 'CREATED' }
            #swagger.responses[401] = { description: 'NOT AUTHORIZED' }
            #swagger.responses[403] = { description: 'FORBIDDEN' }
            #swagger.responses[404] = { description: 'NOT FOUND' }
        */
    )
    .patch('/orders/:idOrder', auth.jwt, catchErrors(updateOrder)
        /* 
            #swagger.tags = ['The Orders']
            #swagger.description = 'Endpoint to update a order by id.'
            #swagger.security = [{
                "bearerAuth": []
            }]
            #swagger.parameters['Order'] = { 
                in: 'body',
                type: 'object',
                required: true,
                description: 'Update an existing order',
                schema: { $ref: "#/components/schemas/order" }
            }
        
            #swagger.responses[200] = { description: 'OK' }
            #swagger.responses[401] = { description: 'NOT AUTHORIZED' }
            #swagger.responses[403] = { description: 'FORBIDDEN' }
            #swagger.responses[404] = { description: 'NOT FOUND' }
        */
    )
    .delete('/orders/:idOrder', auth.jwt, catchErrors(deleteOrder)
        /*
            #swagger.tags = ['The Orders']
            #swagger.description = 'Endpoint to delete a order.'
            #swagger.parameters[idOrder] = {
                in: 'path',
                name: 'idOrder',
                description: 'The id of the order to be deleted',
                required: true,
                type: 'string'
            }
            #swagger.security = [{
                "bearerAuth": []
            }]
            #swagger.responses[204] = { description: 'DELETED' }
            #swagger.responses[401] = { description: 'NOT AUTHORIZED' }
            #swagger.responses[403] = { description: 'FORBIDDEN' }
            #swagger.responses[404] = { description: 'NOT FOUND' }
        */
    )
    .get('/qrcodes', auth.jwt, catchErrors(getAllQrCodes)

        /*
            #swagger.tags = ['The QR Codes']
            #swagger.description = 'Endpoint to get all QR Codes.'
            #swagger.security = [{
                "bearerAuth": []
            }]
            #swagger.responses[200] = { description: 'OK' }
            #swagger.responses[404] = { description: 'NOT FOUND' }
            #swagger.responses[403] = { description: 'FORBIDDEN' }
        */
    )
    .get('/qrcodes/:idQrCode', auth.jwt, catchErrors(getQrCode)
        /*
            #swagger.tags = ['The QR Codes']
            #swagger.description = 'Endpoint to get a QR Code by id.'
            #swagger.security = [{
                "bearerAuth": []
            }]
            #swagger.parameters[idQrCode] = { 
                in: 'path', 
                name: 'idQrCode', 
                description: 'The ID of The QR Codes', 
                required: true, 
                type: 'string' 
            }
            #swagger.responses[200] = { description: 'OK' }
            #swagger.responses[403] = { description: 'FORBIDDEN' }
            #swagger.responses[404] = { description: 'NOT FOUND' }
        */
    )

    /*====================PUBLIC ROUTES======================*/

    //#region PUBLIC ROUTES 
    .get('/drones', catchErrors(getAllDrones)
        /*
            #swagger.tags = ['The Drones']
            #swagger.description = 'Endpoint to get a drone.'
        
            #swagger.responses[200] = { description: 'OK' }
            #swagger.responses[404] = { description: 'NOT FOUND' }
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
            #swagger.responses[200] = { description: 'OK' }
            #swagger.responses[404] = { description: 'NOT FOUND' }
            */
    )
    .get('/drones/categories/:idCategory', catchErrors(getDronesByCategory)
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
            #swagger.responses[200] = { description: 'OK' }
            #swagger.responses[404] = { description: 'NOT FOUND' }
            */
    )
    .get('/categories', catchErrors(getAllCategories)
        /*
            #swagger.tags = ['The Categories']
            #swagger.description = 'Endpoint to get a category.'
            
            #swagger.responses[200] = { description: 'OK' }
            #swagger.responses[404] = { description: 'NOT FOUND' }
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
          #swagger.responses[200] = { description: 'OK' }
          #swagger.responses[404] = { description: 'NOT FOUND' }
          */
    )

    //#endregion

    // #swagger.ignorePaths = ['/api/v1/signup']
    .post('/signup', auth.signup,
        async (req, res, next) => {
            if (!req.body) {
                return next(new AppError('Une erreur est survenue', 400))
            }

            res.status(201).send({
                message: 'Inscription réussie',
                user: req.user
            })
        }
        /*
           #swagger.tags = ['Signup']
           #swagger.description = 'Endpoint to signup a new user.'
           #swagger.parameters['Signup'] = { 
               in: 'query',
               type: 'string',
               name: 'Signup',
               required: true,
               description: 'Signin with usual pattern',
               schema: { $ref: "#/components/schemas/signup" }
           }      
              #swagger.responses[201] = { description: 'CREATED'},
              #swagger.responses[400] = { description: 'BAD REQUEST'}
           */
    )

    .post('/login', (req, res, next) => {
        passport.authenticate('login', async (err, user) => {
            try {
                if (err || !user) {
                    return next(new AppError('Une erreur est survenue', 400))
                }
                req.login(user, { session: false }, async err => {
                    if (err) {
                        return next(new AppError('Une erreur est survenue', 400))
                    }

                    const body = {
                        _id: user._id,
                        email: user.email,
                        firstName_u: user.firstName_u,
                        lastName_u: user.lastName_u,
                        key_r: user.key_r,
                        company_u: user.company_u,
                        phone_u: user.phone_u,
                        address_u: user.address_u,
                        zipCode_u: user.zipCode_u,
                        country_u: user.country_u,
                        siret_u: user.siret_u
                    }
                    const token = jwt.sign({ user: body }, process.env.JWT_SECRET, { expiresIn: '30d' })
                    res.send({ token, user: body, message: 'Connexion réussie' })

                })
            } catch (error) {
                return next(new AppError(`Une erreur est survenue: ${error}`, 400))
            }
        })(req, res, next)
    }
        /*
            #swagger.tags = ['Login']
            #swagger.description = 'Endpoint to login a user.'
            #swagger.parameters['Login'] = { 
                name: 'Login',
                required: true,
                description: 'Login with email and password',
                schema: { $ref: "#/components/schemas/login" }
            }       
            #swagger.responses[200] = { description: 'OK'},
            #swagger.responses[400] = { description: 'BAD REQUEST'}
            */
    )


export default router
