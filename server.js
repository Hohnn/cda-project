import express from 'express'
import routes from './routes/routes.js'
import dotenv from 'dotenv'
import './auth/auth.js'
dotenv.config()
import passport from 'passport'
import mongoose from 'mongoose'
import swaggerUI from 'swagger-ui-express'
import swaggerJsDoc from 'swagger-jsdoc'
import cors from 'cors'
import privateRoutes from './routes/privateRoutes.js'

const PORT = process.env.PORT || 5000 // variable d'enviroment pour le port

//swagger options 
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "SkyDrone API",
      version: "1.0.0",
      description: "This is the SkyDrone project API.",
      termsOfService: "https://skydrone-api.herokuapp.com/terms"    
    },
    servers: [
      {
        url: "http://localhost:5000"
      }
    ]
  },
  apis: ["./routes/*.js"],
}

const specs = swaggerJsDoc(options)

const app = express() // création de l'application express

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs))

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
