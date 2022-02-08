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
  updateUser,
  getUserById
} from '../controllers/userControllers.js'
import {
  getAllCategories,
  getCategory,
  addCategory,
  deleteCategory,
  updateCategory,
  getCategoryById
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
  getDrone,
  updateDrone,
  deleteDrone,
  getDroneById,
  getDroneByCategory
} from '../controllers/droneControllers.js'
import {
  addOrder,
  getAllOrders,
  getOrder,
  updateOrder,
  deleteOrder,
  getOrderById
} from '../controllers/orderControllers.js'

// Path avec ES module
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const router = express.Router() // création du router

router.param("idDrone", catchErrors(getDroneById))
.param("idCategory", catchErrors(getCategoryById))

//#region User
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
 *           description: The email of the user
 *         password:
 *           type: string
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
 * tags:
 *  - name: User
 *    description: Operations about user
 *    externalDocs:
 *      description: Find out more about our store
 *      url: "https://skydrone-api.herokuapp.com/api-docs"
 *  - name: Drone
 *    description: The drones
 *    externalDocs:
 *      description: Everythings about our drones
 *      url: "https://skydrone-api.herokuapp.com/api-docs"
 *  - name: Role
 *    description: The user's role
 *  - name: Categories
 *    description: The drone categories
 *  - name: Process State
 *    description: The drone process state 
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
.get('/api/v1/users', catchErrors(getUsers))

/**
 * @swagger
 * /api/v1/users/login:
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
    try{
      if (err || !user) {
        return res.status(400).json( 
          {
            message: 'Something is not right',
            user: user
          }
        )
      }

      req.login(user, {session: false}, async error => {
        if (error) return next(error)
        
        const body = { _id: user._id, email: user.email }
        const token = jwt.sign({ user: body }, process.env.JWT_SECRET)
        res.json({ token, user: body })
    })
    } catch(error) {
      return next(error)
    }
  })(req, res, next)
})
      

/**
 * @swagger
 * /api/v1/users/logout:
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
.get('/api/v1/logout', catchErrors())

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
 *           type: ObjectId
 *     responses:
 *       200:
 *         description: The list of all users
 *         content:
 *           application/json:
 *             schema:
 *                 items:
 *                   $ref: '#/components/schemas/userModel'
 *       404:
 *         description: The user was not found
 */
 .get('/api/v1/users/:idUser', catchErrors(getUser))
 .param("idUser", getUserById)
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
 *           type: ObjectId
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
.patch('/api/v1/users/:idUser', catchErrors(updateUser))


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
 .post('/api/v1/users', catchErrors(addUser))

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
 *           type: ObjectId
 *         required: true
 *         description: The user ObjectId 
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
.delete('/api/v1/users/:idUser', catchErrors(deleteUser))

//#endregion

//#region Drone
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
.get('/api/v1/drones', catchErrors(getAllDrones))

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
.get('/api/v1/drones/categories/:idCategory', catchErrors(getDroneByCategory))

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
.post('/api/v1/drones', catchErrors(addDrone))


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
 *           type: ObjectId
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
.get('/api/v1/drones/:idDrone', catchErrors(getDrone))

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
 *           type: ObjectId
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
.patch('/api/v1/drones/:idDrone', catchErrors(updateDrone))

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
 *           type: ObjectId
 *         required: true
 *         description: The user ObjectId 
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
.delete('/api/v1/drones/:idDrone', catchErrors(deleteDrone))
//#endregion

//#region Role

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
 * /api/v1/role:
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
router.get('/api/v1/roles', catchErrors(getRoles))

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
 *           type: ObjectId
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
.get('/api/v1/roles/:idRole', catchErrors(getRole))

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
.post('/api/v1/roles', catchErrors(addRole))

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
 *           type: ObjectId
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
.patch('/api/v1/roles/:idRole', catchErrors(updateRole))

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
 *           type: ObjectId
 *         required: true
 *         description: The user ObjectId 
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
.delete('/api/v1/roles/:idRole', catchErrors(deleteRole))
//#endregion

//#region 
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
 *                   $ref: '#/components/schemas/categoriesModel'
 */
.get('/api/v1/categories', catchErrors(getAllCategories))

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
 *           type: ObjectId
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
.get('/api/v1/categories/:idCategory', catchErrors(getCategory))

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
.post('/api/v1/categories', catchErrors(addCategory))

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
 *           type: ObjectId
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
.patch('/api/v1/categories/:idCategory', catchErrors(updateCategory))

/**
 * @swagger
 * /api/v1/categories/{idCategory}:
 *   delete:
 *     summary: Delete a category by id
 *     tags: [Role]
 *     parameters:
 *       - in: path
 *         name: idCategory
 *         schema: 
 *           type: ObjectId
 *         required: true
 *         description: The user ObjectId 
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
.delete('/api/v1/categories/:idCategory', catchErrors(deleteCategory))
//#endregion


//#region ProcessState

/**
 * @swagger
 * components:
 *   schemas:
 *     ProcessStateModel:
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
.get('/api/v1/ps', catchErrors(getAllProcessStates))

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
 *           type: ObjectId
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
.get('/api/v1/ps/:idPs', catchErrors(getProcessState))

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
.post('/api/v1/ps', catchErrors(addProcessState))
//#endregion

.patch('/api/v1/ps/:idPs', catchErrors(updateProcessState))
.delete('/api/v1/ps/:idPs', catchErrors(deleteProcessState))

//ORDERS
.get('/api/v1/orders', catchErrors(getAllOrders))
.get('/api/v1/orders/:idOrder', catchErrors(getOrder))
.post('/api/v1/orders', catchErrors(addOrder))
.patch('/api/v1/orders/:idOrder', catchErrors(updateOrder))
.delete('/api/v1/orders/:idOrder', catchErrors(deleteOrder))

router.param("idOrder", catchErrors(getOrderById))

//authentification
.post('/signup', passport.authenticate('signup', { session: false }),
    async (req, res, next) => {
    res.json({
        message: 'Signup success',
        user: req.user
    })
  })


export default router