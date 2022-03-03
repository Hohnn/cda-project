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

//#region Express

// création de l'application express
const app = express()
// Permet le traitement des json en POST
app.use(express.json()) 

//#endregion

//#region Cross Origin Ressource Sharing

//implements CORS
app.use(cors())

//ACCESS-CONTROL-ALLOW-ORIGIN : *
app.options('*', cors());


//#endregion

//#region Swagger
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
        url: "https://skydrone-api.herokuapp.com/"
        // url: "http://localhost:3000/"
      }
    ]
  },
  apis: ["./routes/*.js"],
}
const specs = swaggerJsDoc(options)
//#endregion

//#region routes by default

//route "/"
app.get("/", (req, res) => {
    res.send({
        message: "Welcome to SkyDrone API."
    });
});

//route swagger
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs))

// middleware pour les fichiers statiques 
//( les fichiers de build seront accessibles depuis la racine du serveur)
app.use(express.static('client/build'))

//#endregion

//#region MongoDB Connection 

// connection à la base de données
mongoose.connect(process.env.MONGODB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(() => {
  console.log('Connected to MongoDB Atlas')
}).catch(err => {
  console.log('Error: ', err.message)
})


//#endregion

//#region private routes

app.use( 
  '/private', 
  passport.authenticate('jwt', { session: false }),
  privateRoutes 
)

//#endregion

//#region public routes

// middleware pour les routes publiques
app.use('api/v1',routes) 

/*app.all('*', (req, res, next) => { 
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});*/


//#endregion

//#region PORT
// variable d'enviroment pour le port
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`)
})
//#endregion

