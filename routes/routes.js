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
router.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/index.html'))
})

// TEST !!! Lien vers la page products
router.get('/products', getDronesTest)

// ROUTE DRONES
// READ ALL DRONES
router.get('/api/drones', catchErrors(getAllDrones))
// READ ONE DRONE
router.get('/api/drones/:id', catchErrors(getDrone))
// CREATE
router.post('/api/drone', catchErrors(addDrone))
// UPDATE
router.patch('/api/drones/:id', catchErrors(updateDrone))
// DELETE
router.delete('/api/drones/:id', catchErrors(deleteDrone))

// route User
router.get('/api/users', catchErrors(getUsers))
router.get('/api/users/:id', catchErrors(getUser))
router.post('/api/users', catchErrors(addUser))
router.patch('/api/users/:id', catchErrors(updateUser))
router.delete('/api/users/:id', catchErrors(deleteUser))

// route Role
router.get('/api/roles', catchErrors(getRoles))
router.get('/api/roles/:id', catchErrors(getRole))
router.post('/api/roles', catchErrors(addRole))
router.patch('/api/roles/:id', catchErrors(updateRole))
router.delete('/api/roles/:id', catchErrors(deleteRole))

// route Role
router.get('/api/categories', catchErrors(getAllCategories))
router.get('/api/categories/:id', catchErrors(getCategory))
router.post('/api/categories', catchErrors(addCategory))
router.patch('/api/categories/:id', catchErrors(updateCategory))
router.delete('/api/categories/:id', catchErrors(deleteCategory))

// route ProcessState
router.get('/api/ps', catchErrors(getAllProcessStates))
router.get('/api/ps/:id', catchErrors(getProcessState))
router.post('/api/ps', catchErrors(addProcessState))

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

/* router.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'))
}) */

export default router
