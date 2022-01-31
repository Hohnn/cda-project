import express  from "express"

const router = express.Router()

router.get('/secret', (req, res) => {
    res.json({
        message: 'This is a secret message',
        user: req.user,
        token: req.query.token
    })
})


export default router