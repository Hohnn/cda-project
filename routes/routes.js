import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import jwt from 'jsonwebtoken'
import passport from 'passport';
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
  getAllProcessStates,
  getProcessState,
  addProcessState,
  updateProcessState,
  deleteProcessState
} from '../controllers/processStateControllers.js'
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

// Path avec ES module
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const router = express.Router()

//#region
//#endregion

//#region Swagger config

/**
 * @swagger
 * tags:
 *  - name: User
 *    description: Operations about user
 *    externalDocs:
 *      description: Find out more about our store
 *      url: "https://skydrone-api.herokuapp.com/"
 *  - name: Drone
 *    description: The drones
 *    externalDocs:
 *      description: Everythings about our drones
 *      url: "https://skydrone-api.herokuapp.com/"
 *  - name: Role
 *    description: The user's role
 *  - name: Categories
 *    description: The drone categories
 *  - name: Process State
 *    description: The drone process state
 *  - name: Orders
 *    description: The orders
 */
//#endregion

//#region Swagger User
    /**
     * @swagger
     * components:
     *   schemas:
     *     userModel:
     *       type: object
     *       required:
     *         - email
     *         - password 
     *         - firstName_u
     *         - lastName_u 
     *         - company_u 
     *         - phone_u
     *         - key_r
     *         - createAt_u
     *         - updateAt_u
     *       properties:
     *         email:
     *           type: string
     *           format: email
     *           description: The email of the user
     *         password:
     *           type: string
     *           writeOnly: true
     *           description: The password of the user
     *         firstName_u:
     *           type: string
     *           description: The firstname of the user
     *         lastName_u:
     *           type: string
     *           description: The lastname of the user
     *         company_u:
     *           type: string
     *           description: The company name of the user
     *         phone_u:
     *           type: string
     *           description: The phone number of the user
     *         address_u:
     *           type: string
     *           description: The address of the user
     *         key_r:
     *           type: number
     *           description: The key role of the user
     *         createdBy_id:
     *           type: string
     *           description: The creating id parent of the user
     *         createAt_u:
     *           type: string
     *           format: date-time
     *           description: The date of user creation
     *         updateBy_id:
     *           type: string
     *           description: The id of updated user's collection
     *         updateAt_u:
     *           type: string
     *           format: date-time
     *           description: The updating date of the user collection
     *         role_id:
     *           type: string
     *           description: The role id of the user
     *       
     */



    /**
     * @swagger
     * /api/v1/users:
     *   get:
     *     summary: Return the list of all users
     *     tags: [User]
     *     responses:
     *       200:
     *         description: The list of all users
     *         content:
     *           application/json:
     *             schema:
     *                 items:
     *                   $ref: '#/components/schemas/userModel'
     */


 


    /**
     * @swagger
     * /api/v1/users/{idUser}:
     *   get:
     *     summary: Return the user by id
     *     tags: [User]
     *     parameters:
     *       - name: idUser
     *         in: path
     *         description: The user id
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: The user by id
     *         content:
     *           application/json:
     *             schema:
     *                 items:
     *                   $ref: '#/components/schemas/userModel'
     *       402:
     *         description: The user was not found
     */


    /**
     * @swagger
     * /api/v1/users/{idUser}:
     *   patch:
     *     summary: Update a user by id
     *     tags: [User]
     *     parameters:
     *       - in: path
     *         name: idUser
     *         schema:
     *           type: string
     *         required: true
     *         description: The user id
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/userModel'
     *     responses:
     *       200:
     *         description: The user data are successfully updated
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/userModel'
     *       404:
     *         description: The user was not found
     *       500:
     *         description: Some server error
     */



    /**
     * @swagger
     * /api/v1/users:
     *   post:
     *     summary: Create a new user
     *     tags: [User]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/userModel'
     *     responses:
     *       200:
     *         description: The new user is successfully created
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/userModel'
     *       500:
     *         description: Some server error
     */
 

    /**
     * @swagger
     * /api/v1/users/{idUser}:
     *   delete:
     *     summary: Delete a user by id
     *     tags: [User]
     *     parameters:
     *       - in: path
     *         name: idUser
     *         schema: 
     *           type: string
     *         required: true
     *         description: The user string 
     *     responses:
     *       200:
     *         description: The user is successfully deleted
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/userModel'
     *       404:
     *         description: The user is not found
     */


//#endregion

router
    .get('/api/v1/users', catchErrors(getUsers))
    .get('/api/v1/users/:idUser', catchErrors(getUser))
    .delete('/api/v1/users/:idUser', catchErrors(deleteUser))
    .patch('/api/v1/users/:idUser', catchErrors(updateUser))
    .post('/api/v1/users', catchErrors(addUser))
    

//#region Swagger Drone
    /**
     * @swagger
     * components:
     *   schemas:
     *     droneModel:
     *       type: object
     *       required:
     *         - name_d
     *         - category_id 
     *         - description_d
     *         - pricePerDay_d 
     *         - processState_id
     *       properties:
     *         name_d:
     *           type: string
     *           description: The name of the drone
     *         category_id:
     *           type: string
     *           description: The category of the drone
     *         description_d:
     *           type: string
     *           description: The description of the drone
     *         pricePerDay_d:
     *           type: number
     *           description: The price per day of the drone
     *         processState_id:
     *           type: string
     *           description: The process state id
     */

    /**
     * @swagger
     * /api/v1/drones:
     *   get:
     *     summary: Return the list of all drones
     *     tags: [Drone]
     *     responses:
     *       200:
     *         description: The list of all drones
     *         content:
     *           application/json:
     *             schema:
     *                 items:
     *                   $ref: '#/components/schemas/droneModel'
     */


    /**
     * @swagger
     * /api/v1/drones/categories/{idCategory}:
     *   get:
     *     summary: Return the list of drones by category
     *     tags: [Drone]
     *     parameters:
     *       - name: idCategory
     *         in: path
     *         description: Return a list of drones inventory by category
     *         required: true
     *         type: string 
     *     responses:
     *       200:
     *         description: The list of drones by selected category
     *         content:
     *           application/json:
     *             schema:
     *                 items:
     *                   $ref: '#/components/schemas/droneModel'
     *       400:
     *         description: Invalid ID supplied
     *       404:
     *         description: Category not found
     */

    /**
     * @swagger
     * /api/v1/drones:
     *   post:
     *     summary: Create a new drone
     *     tags: [Drone]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/droneModel'
     *     responses:
     *       200:
     *         description: The new drone is successfully created
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/droneModel'
     *       500:
     *         description: Some server error
     */


    /**
     * @swagger
     * /api/v1/drones/{idDrone}:
     *   get:
     *     summary: Return the drone by id
     *     tags: [Drone]
     *     parameters:
     *       - name: idDrone
     *         in: path
     *         description: The drone id
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: The list of all drones
     *         content:
     *           application/json:
     *             schema:
     *                 items:
     *                   $ref: '#/components/schemas/droneModel'
     *       404:
     *         description: The drone was not found
     */

    /**
     * @swagger
     * /api/v1/drones/{idDrone}:
     *   patch:
     *     summary: Update a drone by id
     *     tags: [Drone]
     *     parameters:
     *       - in: path
     *         name: idDrone
     *         schema:
     *           type: string
     *         required: true
     *         description: The drone id
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/droneModel'
     *     responses:
     *       200:
     *         description: The drone data are successfully updated
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/droneModel'
     *       404:
     *         description: The drone was not found
     *       500:
     *         description: Some server error
     */

    /**
     * @swagger
     * /api/v1/drones/{idDrone}:
     *   delete:
     *     summary: Delete a drone by id
     *     tags: [Drone]
     *     parameters:
     *       - in: path
     *         name: idDrone
     *         schema: 
     *           type: string
     *         required: true
     *         description: The user string 
     *     responses:
     *       200:
     *         description: The drone is successfully deleted
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/droneModel'
     *       404:
     *         description: The drone is not found
     */

//#endregion

    .patch('/api/v1/drones/:idDrone', catchErrors(updateDrone))
    .get('/api/v1/drones/:idDrone', catchErrors(getDrone))
    .post('/api/v1/drones', catchErrors(addDrone))
    .get('/api/v1/drones/categories/:idCategory', catchErrors(getDroneByCategory))
    .get('/api/v1/drones', catchErrors(getAllDrones))
    .delete('/api/v1/drones/:idDrone', catchErrors(deleteDrone))


//#region Swagger Role

/**
 * @swagger
 * components:
 *   schemas:
 *     roleModel:
 *       type: object
 *       required:
 *         - name_r
 *         - description_r
 *         - key_r 
 *       properties:
 *         name_r:
 *           type: string
 *           description: The name of the role
 *         description_r:
 *           type: string
 *           description: The description of the role
 *         key_r:
 *           type: number
 *           description: The key of the role
 *       example:
 *         name_r: "administrator"
 *         description_r: "Create Read Update Delete any data"
 *         key_r: "1"
 */

/**
 * @swagger
 * /api/v1/roles:
 *   get:
 *     summary: Return the list of all roles
 *     tags: [Role]
 *     responses:
 *       200:
 *         description: The list of all roles
 *         content:
 *           application/json:
 *             schema:
 *                 items:
 *                   $ref: '#/components/schemas/roleModel'
 */


/**
 * @swagger
 * /api/v1/roles/{idRole}:
 *   get:
 *     summary: Return the role by id
 *     tags: [Role]
 *     parameters:
 *       - name: idRole
 *         in: path
 *         description: The role id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The list of all roles
 *         content:
 *           application/json:
 *             schema:
 *                 items:
 *                   $ref: '#/components/schemas/roleModel'
 *       404:
 *         description: The role was not found
 */

/**
 * @swagger
 * /api/v1/roles:
 *   post:
 *     summary: Create a new role
 *     tags: [Role]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/roleModel'
 *     responses:
 *       200:
 *         description: The new role is successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/roleModel'
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /api/v1/roles/{idRole}:
 *   patch:
 *     summary: Update a role by id
 *     tags: [Role]
 *     parameters:
 *       - in: path
 *         name: idRole
 *         schema:
 *           type: string
 *         required: true
 *         description: The role id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/roleeModel'
 *     responses:
 *       200:
 *         description: The role data are successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/roleModel'
 *       404:
 *         description: The role was not found
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /api/v1/roles/{idRole}:
 *   delete:
 *     summary: Delete a role by id
 *     tags: [Role]
 *     parameters:
 *       - in: path
 *         name: idRole
 *         schema: 
 *           type: string
 *         required: true
 *         description: The user string 
 *     responses:
 *       200:
 *         description: The role is successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/roleModel'
 *       404:
 *         description: The role is not found
 */

//#endregion

    .patch('/api/v1/roles/:idRole', catchErrors(updateRole))
    .post('/api/v1/roles', catchErrors(addRole))
    .get('/api/v1/roles/:idRole', catchErrors(getRole))
    .get('/api/v1/roles', catchErrors(getRoles))
    .delete('/api/v1/roles/:idRole', catchErrors(deleteRole))


//#region Swagger Categories
/**
 * @swagger
 * components:
 *   schemas:
 *     categoryModel:
 *       type: object
 *       required:
 *         - name_cat
 *         - description_cat
 *         - key_cat 
 *       properties:
 *         name_cat:
 *           type: string
 *           description: The name of the category
 *         description_cat:
 *           type: string
 *           description: The description of the category
 *         key_cat:
 *           type: number
 *           description: The key of the category
 *       example:
 *         name_cat: "D"
 *         description_cat: "les aéronefs utilisés pour un travail aérien d’une masse au décollage inférieure à 2 Kg (structure + charge)"
 *         key_cat: "1"
 */

/**
 * @swagger
 * /api/v1/categories:
 *   get:
 *     summary: Return the list of all categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: The list of all categories
 *         content:
 *           application/json:
 *             schema:
 *                 items:
 *                   $ref: '#/components/schemas/categoryModel'
 */


/**
 * @swagger
 * /api/v1/categories/{idCategory}:
 *   get:
 *     summary: Return a category by id
 *     tags: [Categories]
 *     parameters:
 *       - name: idCategory
 *         in: path
 *         description: The category id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The list of all categories
 *         content:
 *           application/json:
 *             schema:
 *                 items:
 *                   $ref: '#/components/schemas/categoryModel'
 *       404:
 *         description: The category was not found
 */

/**
 * @swagger
 * /api/v1/categories:
 *   post:
 *     summary: Create a new category
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/categoryModel'
 *     responses:
 *       200:
 *         description: The new category is successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/categoryModel'
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /api/v1/categories/{idCategory}:
 *   patch:
 *     summary: Update a category by id
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: idCategory
 *         schema:
 *           type: string
 *         required: true
 *         description: The category id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/categoryModel'
 *     responses:
 *       200:
 *         description: The category data are successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/roleModel'
 *       404:
 *         description: The category was not found
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /api/v1/categories/{idCategory}:
 *   delete:
 *     summary: Delete a category by id
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: idCategory
 *         schema: 
 *           type: string
 *         required: true
 *         description: The user string 
 *     responses:
 *       200:
 *         description: The category is successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/categoryModel'
 *       404:
 *         description: The category is not found
 */

//#endregion

    .get('/api/v1/categories', catchErrors(getAllCategories))
    .post('/api/v1/categories', catchErrors(addCategory))
    .get('/api/v1/categories/:idCategory', catchErrors(getCategory))
    .patch('/api/v1/categories/:idCategory', catchErrors(updateCategory))
    .delete('/api/v1/categories/:idCategory', catchErrors(deleteCategory))


//#region Swagger ProcessState

    /**
     * @swagger
     * components:
     *   schemas:
     *     processStateModel:
     *       type: object
     *       required:
     *         - name_ps
     *         - description
     *         - key_ps
     *       properties:
     *         name_ps:
     *           type: string
     *           description: The name of the process state
     *         description:
     *           type: string
     *           description: The description of the process state
     *         key_ps: 
     *           type: number
     *           description: The key code of the process state
     */

    /**
     * @swagger
     * /api/v1/ps:
     *   get:
     *     summary: Return the list of all process states
     *     tags: [Process State]
     *     responses:
     *       200:
     *         description: The list of all process states
     *         content:
     *           application/json:
     *             schema:
     *                 items:
     *                   $ref: '#/components/schemas/processStateModel'
     */


    /**
     * @swagger
     * /api/v1/ps/{idPs}:
     *   get:
     *     summary: Return a process state by id
     *     tags: [Process State]
     *     parameters:
     *       - name: idPs
     *         in: path
     *         description: The process state id
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: The list of a process state
     *         content:
     *           application/json:
     *             schema:
     *                 items:
     *                   $ref: '#/components/schemas/processStateModel'
     *       404:
     *         description: The category was not found
     */

    /**
     * @swagger
     * /api/v1/ps:
     *   post:
     *     summary: Create a new process state
     *     tags: [Process State]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/processStateModel'
     *     responses:
     *       200:
     *         description: The new process state is successfully created
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/processStateModel'
     *       500:
     *         description: Some server error
     */

    /**
     * @swagger
     * /api/v1/ps/{idPs}:
     *   patch:
     *     summary: Update a process state by id
     *     tags: [Process State]
     *     parameters:
     *       - name: idPs
     *         in: path
     *         description: The process state id
     *         required: true
     *         schema:
     *           type: string
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/processStateModel'
     *     responses:
     *       200:
     *         description: The process state data are successfully updated
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/processStateModel'
     *       404:
     *         description: The process state was not found
     *       500:
     *         description: Some server error
     */

    /**
     * @swagger
     * /api/v1/ps/{idPs}:
     *   delete:
     *     summary: Delete a process state by id
     *     tags: [Process State]
     *     parameters:
     *       - name: idPs
     *         in: path
     *         description: The process state id
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: The process state is successfully deleted
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/processStateModel'
     *       404:
     *         description: The process state was not found
     *       500:
     *         description: Some server error
     */

    //#endregion

    .get('/api/v1/ps', catchErrors(getAllProcessStates))
    .post('/api/v1/ps', catchErrors(addProcessState))
    .get('/api/v1/ps/:idPs', catchErrors(getProcessState))
    .patch('/api/v1/ps/:idPs', catchErrors(updateProcessState))
    .delete('/api/v1/ps/:idPs', catchErrors(deleteProcessState))

//#region Swagger Orders

    /**
     * @swagger
     * components:
     *   schemas:
     *     orderModel:
     *       type: object
     *       required:
     *         - user_id
     *         - drone_id
     *         - endAt_o
     *         - report_o
     *         - createdBy_o
     *       properties:
     *         user_id:
     *           type: string
     *           description: The requesting user's string 
     *         drone_id:
     *           type: string
     *           description: The requested drone's string 
     *         startAt_o:
     *           type: string
     *           description: The open date of the order
     *         endAt_o:
     *           type: string
     *           description: The closing date of the order
     *         report_o:
     *           type: string
     *           description: The pilot's report after mission
     *         createdBy_o:
     *           type: string
     *           description: The creating user's string  
     *         createdAt_o:
     *           type: string
     *           description: The order's creating date
     *         updateBy_o:
     *           type: string
     *           description: The update user's string
     *         updateAt_o:
     *           type: string
     *           description: The update order date 
     *           
     */

    /**
     * @swagger
     * /api/v1/orders:
     *   get:
     *     summary: Return the list of all orders
     *     tags: [Orders]
     *     responses:
     *       200:
     *         description: The list of all orders
     *         content:
     *           application/json:
     *             schema:
     *               items:
     *                 $ref: '#/components/schemas/orderModel'
     *       401:
     *         description: The content is protected
     */


    /**
     * @swagger
     * /api/v1/orders/{idOrder}:
     *   get:
     *     summary: Return an order by id
     *     tags: [Orders]
     *     parameters:
     *       - name: idOrder
     *         in: path
     *         description: The order id
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: The order required 
     *         content:
     *           application/json:
     *             schema:
     *                 items:
     *                   $ref: '#/components/schemas/orderModel'
     *       401:
     *         description: The content is protected
     *       404:
     *         description: The order was not found
     */

    /**
     * @swagger
     * /api/v1/orders:
     *   post:
     *     summary: Create a new order
     *     tags: [Orders]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/orderModel'
     *     responses:
     *       200:
     *         description: The new order is successfully created
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/processStateModel'
     *       401:
     *         description: Unauthorized operation, you must be authenticate to proceed.
     *       500:
     *         description: Some server error
     */

    /**
     * @swagger
     * /api/v1/orders/{idOrder}:
     *   patch:
     *     summary: Update an order by id
     *     tags: [Orders]
     *     parameters:
     *       - in: path
     *         name: idOrder
     *         schema:
     *           type: string
     *         required: true
     *         description: The order id
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/orderModel'
     *     responses:
     *       200:
     *         description: The order datas are successfully updated
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/orderModel'
     *       404:
     *         description: The order was not found
     *       500:
     *         description: Some server error
     */

    /**
     * @swagger
     * /api/v1/orders/{idOrders}:
     *   delete:
     *     summary: Delete an order by id
     *     tags: [Orders]
     *     parameters:
     *       - in: path
     *         name: idOrder
     *         schema:
     *           type: string
     *         required: true
     *         description: The order string
     *     responses:
     *       200:
     *         description: The order is successfully deleted
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/orderModel'
     *       404:
     *         description: The order was not found
     */

//#endregion

    .get('/api/v1/orders', catchErrors(getAllOrders))
    .get('/api/v1/orders/:idOrder', catchErrors(getOrderById))
    .post('/api/v1/orders', catchErrors(addOrder))
    .patch('/api/v1/orders/:idOrder', catchErrors(updateOrder))
    .delete('/api/v1/orders/:idOrder', catchErrors(deleteOrder))


//#region authentication & login routes  
router

    .post('/signup', passport.authenticate('signup', { session: false }),
        async (req, res, next) => {
        res.json({
            message: 'Signup success',
            user: req.user
        })
    })

    /**
     * @swagger
     * /api/v1/login:
     *   post:
     *     summary: Logs user into the system
     *     tags: [User]
     *     parameters:
     *       - name: email
     *         in: query
     *         description: The email of user for login 
     *         required: true
     *         type: string
     *       - name: password
     *         in: query
     *         description: The password for login un clear text
     *         required: true
     *         type: string
     *         format: password
     *     responses:
     *       200:
     *         description: successful operation
     *         schema:
     *           type: string
     *         headers:
     *           X-Rate-Limit:
     *             type: integer
     *             format: int32
     *             description: calls per hour allowed by the user
     *           X-Expired-After:
     *             type: string
     *             format: date-time
     *             description: date in UTC when token expires
     *       400:
     *         description: Invalid username/password supplied
     */
    
    .post('/api/v1/login', (req, res, next) => {
        passport.authenticate('login', (err, user) => {
            try {
                if (err || !user) {
                    return res.status(400).json(
                        {
                            message: 'Something is not right',
                            user: user
                        }
                    )
                }

                req.login(user, { session: false }, async error => {
                    if (error) return next(error)

                    const body = { _id: user._id, email: user.email }
                    const token = jwt.sign({ user: body }, process.env.JWT_SECRET)
                    res.json({ token, user: body })
                })
            } catch (error) {
                return next(error)
            }
        })(req, res, next)
    })

    /**
     * @swagger
     * /api/v1/logout:
     *   get:
     *     summary: Logs out current logged in user session
     *     tags: [User]
     *     operationId: logoutUser
     *     parameters: []
     *     responses:
     *       default:
     *         description: successful operation
     *         
     */

    .get('/api/v1/logout', (req, res) => {
        req.logout()
        res.json({
            message: 'Logout success'
        })
    })


//#endregion

export default router