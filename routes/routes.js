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
  addProcessState
} from '../controllers/processStateControllers.js'
import {
  getDronesTest,
  addDrone,
  getAllDrones,
  getDrone,
  updateDrone,
  deleteDrone
} from '../controllers/droneControllers.js'

// Path avec ES module
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const router = express.Router() // création du router

// Page d'accueil de l'app, affiche index.html
// router.get('/', (req, res) => {
//   res.sendFile(path.resolve(__dirname, '../client/index.html'))
// })

// TEST !!! Lien vers la page products
router.get('/products', catchErrors(getDronesTest))

//#region User

/**
 * @swagger
 * components:
 *   schemas:
 *     UserModel:
 *       type: object
 *       required:
 *         - email
 *         - password 
 *         - firstName_u
 *         - lastName_u 
 *         - company_u 
 *         - phone_u
 *         - createAt_u
 *         - updateAt_u
 *       properties:
 *         id:
 *           type: string
 *           description: The Auto-generated id of a user
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
 *         role_id:
 *           type: string
 *           description: The role id of the user
 *         createdBy_id:
 *           type: string
 *           description: The creating id parent of the user
 *         createAt_u:
 *           type: date
 *           description: The date of user creation
 *         updateBy_id:
 *           type: string
 *           description: The id of updated user's collection
 *         updateAt_u :
 *           type: date
 *           description: The updating date of the user collection
 *       example:
 *         email: "email@email.com"
 *         password: "$2b$10$Z/agMC5a1HRh9y3HuhXrROXlyW0.lHhqvDEyb9393aozy3TFFfPLq"
 *         lastName_u: "Doe"
 *         firstname_u: "John"
 *         company_u: "Evil Corp."
 *         phone_u: "0123456789"
 *         createAt_u: 2022-01-01
 *         updateAt_u: 2022-01-01
 *
 */

//#endregion

// route User
router.get('/api/v1/users', catchErrors(getUsers))
router.get('/api/v1/users/:id', catchErrors(getUser))
router.post('/api/v1/users', catchErrors(addUser))
router.patch('/api/v1/users/:id', catchErrors(updateUser))
router.delete('/api/v1/users/:id', catchErrors(deleteUser))

router.get('/api/v1/drones', catchErrors(getAllDrones))
.post('/api/v1/drones', catchErrors(addDrone))
.get('/api/v1/drones/:id', catchErrors(getDrone))
.patch('/api/v1/drones/:id', catchErrors(updateDrone))
.delete('/api/v1/drones/:id', catchErrors(deleteDrone))


// route Role
router.get('/api/v1/roles', catchErrors(getRoles))
router.get('/api/v1/roles/:id', catchErrors(getRole))
router.post('/api/v1/roles', catchErrors(addRole))
router.patch('/api/v1/roles/:id', catchErrors(updateRole))
router.delete('/api/v1/roles/:id', catchErrors(deleteRole))

// route Role
router.get('/api/v1/categories', catchErrors(getAllCategories))
router.get('/api/v1/categories/:id', catchErrors(getCategory))
router.post('/api/v1/categories', catchErrors(addCategory))
router.patch('/api/v1/categories/:id', catchErrors(updateCategory))
router.delete('/api/v1/categories/:id', catchErrors(deleteCategory))

// route ProcessState
router.get('/api/v1/ps', catchErrors(getAllProcessStates))
router.get('/api/v1/ps/:id', catchErrors(getProcessState))
router.post('/api/v1/ps', catchErrors(addProcessState))

//authentification
router.post('/signup', 
passport.authenticate(
  'signup', { session: false }),
    async (req, res, next) => {
    res.json({
        message: 'Signup success',
        user: req.user
    })
  })

/*  router.get('/* ', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'))
}) */

export default router
