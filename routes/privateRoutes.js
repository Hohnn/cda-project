import express from "express"
import { getOrdersByUserId, addOrder, getAllOrders, updateOrder, deleteOrder, getOrderById } from '../controllers/orderControllers.js'
import { catchErrors } from '../helpers.js'
import { getRoles, getRole, addRole, updateRole, deleteRole } from '../controllers/roleControllers.js'
import { getUsers, getUser, addUser, deleteUser, updateUser } from '../controllers/userControllers.js'
import { addCategory, deleteCategory, updateCategory } from '../controllers/categoryControllers.js'
import { addDrone, updateDrone, deleteDrone } from '../controllers/droneControllers.js'
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
    .get('/users/:idUser', catchErrors(getUser)
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
            #swagger.responses[200] = { description: 'user found'},
            #swagger.responses[404] = { description: 'user not found'}
        */
    )
    .delete('/users/:idUser', catchErrors(deleteUser)
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
            #swagger.responses[204] = { description: 'user deleted' }
            #swagger.responses[404] = { description: 'user not found' }
        */
    )
    .patch('/users/:idUser', catchErrors(updateUser)
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

        #swagger.responses[200] = { description: 'user updated' }
        #swagger.responses[404] = { description: 'user not found' }
    */
    )
    .post('/users', catchErrors(addUser)
        /*
        #swagger.tags = ['The Users']
        #swagger.description = 'Endpoint to add a new user.'
        #swagger.security = [{
                "bearerAuth": []
            }]
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

    .delete('/drones/:idDrone', catchErrors(deleteDrone)
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
            #swagger.responses[204] = { description: 'drone deleted' }
            #swagger.responses[404] = { description: 'drone not found' }
        */
    )
    .patch('/drones/:idDrone', catchErrors(updateDrone)
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
    
            #swagger.responses[200] = { description: 'drone updated' }
            #swagger.responses[404] = { description: 'drone not found' }
        */
    )
    .post('/drones', catchErrors(addDrone)
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
    
            #swagger.responses[201] = { description: 'drone added' }
            #swagger.responses[400] = { description: 'drone already exists' }
        */
    )
    .get('/orders/user/:idUser', catchErrors(getOrdersByUserId)
    /*
            #swagger.tags = ['The Orders']
            #swagger.description = 'Endpoint to get all orders by user id.'
            #swagger.security = [{
                "bearerAuth": []
            }]
            #swagger.responses[200] = { description: 'orders found' }
            #swagger.responses[400] = { description: 'error during recovering orders' }
            #swagger.responses[404] = { description: 'orders not found' }
        */
    )
    .get('/roles', catchErrors(getRoles)
        /*
            #swagger.tags = ['The Roles']
            #swagger.description = 'Endpoint to get a role.'
            #swagger.security = [{
                "bearerAuth": []
            }]
            #swagger.responses[200] = { description: 'all roles' }
            #swagger.responses[404] = { description: 'roles not found' }
        */
    )
    .get('/roles/:idRole', catchErrors(getRole)
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
            #swagger.responses[200] = { description: 'role found'},
            #swagger.responses[404] = { description: 'role not found'}
        */
    )
    .delete('/roles/:idRole', catchErrors(deleteRole)
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
            #swagger.responses[204] = { description: 'role deleted' }
            #swagger.responses[404] = { description: 'role not found' }
        */
    )
    .patch('/roles/:idRole', catchErrors(updateRole)
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
    
            #swagger.responses[200] = { description: 'role updated' }
            #swagger.responses[404] = { description: 'role not found' }
        */
    )
    .post('/roles', catchErrors(addRole)
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
    
            #swagger.responses[201] = { description: 'role added' }
            #swagger.responses[400] = { description: 'role already exists' }
            */
    )
    .delete('/categories/:idCategory', catchErrors(deleteCategory)
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
            #swagger.responses[204] = { description: 'category deleted' }
            #swagger.responses[404] = { description: 'category not found' }
        */
    )
    .patch('/categories/:idCategory', catchErrors(updateCategory)
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
    
            #swagger.responses[200] = { description: 'category updated' }
            #swagger.responses[404] = { description: 'category not found' }
        */
    )
    .post('/categories', catchErrors(addCategory)
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
    
            #swagger.responses[201] = { description: 'category added' }
            #swagger.responses[400] = { description: 'category already exists' }
        */
    )
    .get('/orders', catchErrors(getAllOrders)
        /*
            #swagger.tags = ['The Orders']
            #swagger.description = 'Endpoint to get a order.'
            #swagger.security = [{
                "bearerAuth": []
            }]
            #swagger.responses[200] = { description: 'all orders' }
            #swagger.responses[404] = { description: 'orders not found' }
        */
    )
    .get('/orders/:idOrder', catchErrors(getOrderById)
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
            #swagger.responses[200] = { description: 'order found'},
            #swagger.responses[404] = { description: 'order not found'}
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

            #swagger.responses[201] = { description: 'order added' }
            #swagger.responses[400] = { description: 'order already exists' }
        */
    )
    .patch('/orders/:idOrder', catchErrors(updateOrder)
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
    
            #swagger.responses[200] = { description: 'order updated' }
            #swagger.responses[404] = { description: 'order not found' }
        */
    )
    .delete('/orders/:idOrder', catchErrors(deleteOrder)
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
            #swagger.responses[204] = { description: 'order deleted' }
            #swagger.responses[404] = { description: 'order not found' }
        */
    )


export default router