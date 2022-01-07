import express  from "express"
import {
    addRoom,
    deleteRoom,
    updateRoom
  } from '../controllers/roomControllers.js'
  import { catchErrors } from '../helpers.js'

const router = express.Router()

router.get('/secret', (req, res) => {
    res.json({
        message: 'This is a secret message',
        user: req.user,
        token: req.query.token
    })
})

router.post('/api/rooms', catchErrors(addRoom))

router.patch('/api/rooms/:id', catchErrors(updateRoom))

router.delete('/api/rooms/:id', catchErrors(deleteRoom))


export default router