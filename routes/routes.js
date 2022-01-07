import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import jwt from 'jsonwebtoken'
import passport from 'passport';
import { catchErrors } from '../helpers.js'
import {
  getRooms,
  getRoom
} from '../controllers/roomControllers.js'

// Path avec ES module
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const router = express.Router() // création du router

router.get('/api/rooms', catchErrors(getRooms)) // route pour récupérer toutes les rooms

router.get('/api/rooms/:id', catchErrors(getRoom)) // route pour récupérer une room


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

router.post('/login', (req, res, next) => { 
  passport.authenticate('login', async (err, user, info) => {
    try {
      if (err || !user) {
        const error = new Error('An Error occurred')
        return next(error)
      }
      req.login(user, { session: false }, async (error) => {
        if (error) {
          return next(error)
        }
        const body = { _id: user._id, email: user.email }
        const token = jwt.sign({ user: body }, process.env.JWT_SECRET)
        res.json( {token} )
      })
    } catch (error) {
      return next(error)
    }
  })(req, res, next)
})

router.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'))
})

export default router
