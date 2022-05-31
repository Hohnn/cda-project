import express from 'express'
import cors from 'cors'
import routes from './routes/routes.js'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import AppError from './utils/AppError.js'
import globalErrorHandler from './controllers/errorController.js'
import './auth/auth.js'
import swaggerUi from 'swagger-ui-express'
import { readFile } from 'fs/promises'

//#region Express

dotenv.config()
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.set("view engine", "ejs")

//#endregion

//#region Cross Origin Ressource Sharing
app.use(cors())
app.options('*', cors())
//#endregion

//#region PORT

const PORT = process.env.PORT || 3000

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

//#region Swagger

const swaggerFile = JSON.parse(
  await readFile(
    new URL('./swagger-output.json', import.meta.url)
  )
)

app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

//#endregion

//#region routes
app.get("/", (_, res) => {
  res.send({
    message: "Welcome to SkyDrone API."
  })
  /*
  #swagger.tags = ['API root']
  #swagger.description = 'Endpoint to the API.'
  
  #swagger.responses[200] = { description: "Welcome to SkyDrone API." }
  #swagger.responses[500] = { description: "Internal server error." }
  */
})

app.use('/api/v1', routes)


app.all('*', (req, res, next) => {
  next(new AppError(`Cette adresse : ${req.originalUrl} n'est pas disponible sur ce serveur.`, 404))
})

app.use(globalErrorHandler)
//#endregion

app.listen(PORT, () => {
  console.log("Server is running on port: %s (HTTP)", PORT)
})


