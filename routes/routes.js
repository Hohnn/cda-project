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

// TEST !!! Page d'accueil pour affichier index.html
router.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/index.html'))
})

// TEST !!! Lien vers la page products
router.get('/products', getDronesTest)

// ROUTES DRONES
router.get('/api/v1/drones', catchErrors(getAllDrones))
router.get('/api/v1/drones/:idDrone', catchErrors(getDrone))
router.post('/api/v1/drones', catchErrors(addDrone))
router.patch('/api/v1/drones/:idDrone', catchErrors(updateDrone))
router.delete('/api/v1/drones/:idDrone', catchErrors(deleteDrone))

// ROUTES USERS
router.get('/api/v1/users', catchErrors(getUsers))
router.get('/api/v1/users/:idUser', catchErrors(getUser))
router.post('/api/v1/users', catchErrors(addUser))
router.patch('/api/v1/users/:idUser', catchErrors(updateUser))
router.delete('/api/v1/users/:idUser', catchErrors(deleteUser))

// ROUTES ROLES
router.get('/api/v1/roles', catchErrors(getRoles))
router.get('/api/v1/roles/:idRole', catchErrors(getRole))
router.post('/api/v1/roles', catchErrors(addRole))
router.patch('/api/v1/roles/:idRole', catchErrors(updateRole))
router.delete('/api/v1/roles/:idRole', catchErrors(deleteRole))

// ROUTES CATEGORIES
router.get('/api/v1/categories', catchErrors(getAllCategories))
router.get('/api/v1/categories/:idCategory', catchErrors(getCategory))
router.post('/api/v1/categories', catchErrors(addCategory))
router.patch('/api/v1/categories/:idCategory', catchErrors(updateCategory))
router.delete('/api/v1/categories/:idCategory', catchErrors(deleteCategory))

// ROUTES ProcessState
router.get('/api/v1/ps', catchErrors(getAllProcessStates))
router.get('/api/v1/ps/:idProcessSate', catchErrors(getProcessState))
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

export default router