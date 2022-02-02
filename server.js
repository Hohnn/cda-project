import express from 'express'
import mongoose from 'mongoose'
import routes from './routes/routes.js'
import dotenv from 'dotenv'
import './auth/auth.js'
dotenv.config()
import privateRoutes from './routes/privateRoutes.js'
import passport from 'passport'
import cors from 'cors'

const PORT = process.env.PORT || 5000 // variable d'enviroment pour le port

const app = express() // création de l'application express
 
app.use(express.json()) // middleware pour les requêtes json

app.use(express.static('client/build')) // middleware pour les fichiers statiques ( les fichiers de build seront accessibles depuis la racine du serveur)

mongoose.connect(process.env.MONGODB, { // connection à la base de données
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})

app.use( // middleware pour les routes privées
  '/private', 
  passport.authenticate('jwt', { session: false }),
  privateRoutes 
)

app.use(cors())

app.use(routes) // middleware pour les routes publiques

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`)
})
