import express from 'express'
import routes from './routes/routes.js'
import './auth/auth.js'
import cors from 'cors'
import bodyparser from 'body-parser'
import { readFile } from 'fs/promises'
import dotenv from 'dotenv'
import AppError from './utils/AppError.js'
import globalErrorHandler from './controllers/errorController.js'
import mongoose from 'mongoose'
import swaggerUi from 'swagger-ui-express'


//#region Express
dotenv.config()

// création de l'application express
const app = express()
// Permet le traitement des json en POST
app.use(express.json())

//#endregion

//#region Cross Origin Ressource Sharing

app.use(cors({
  origin: '*',
  options: 'GET,POST,PATCH,DELETE',
  allowedHeaders: 'Content-type,Authorization',
  credentials: true
})
)

//#region QrCode

//Use express package to set our template engine (view engine) 
//and the body-parser middleware for parsing bodies 
//from URL and JSON objects.

app.set("view engine", "ejs")
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())

// Simple routing to the index.ejs file
/* #swagger.ignore = true*/
// app.get("/qr", (req, res) => {
//   res.render("index")
// })

// Blank input
// Incase of blank in the index.ejs file, return error 
// Error  - Empty Data!

// app.post("/scan", (req, res) => {
//   const url = req.body.url

//   if (url.length === 0) res.send("Empty Data!")
//   qrcode.toDataURL(url, (err, src) => {
//     if (err) res.send("Error occured")

//     res.render("scan", { src })
//   })
// })
//#endregion


//#region PORT

const PORT = process.env.PORT || 3000

//#endregion


app.use(cors())

//#endregion

//#region Upload

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))

app.use('/images', express.static('images'))

//#endregion

//#region routes by default

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
app.use('/api/v1', routes)

//error route handler
app.all('*', (req, _res, next) => {
  next(new AppError(`Cette adresse : ${req.originalUrl} n'est pas disponible sur ce serveur.`, 404))
})
app.use(globalErrorHandler)

//#endregion


app.listen(PORT, () => {
  console.log("Server is running on port: %s (HTTP)", PORT)
})

export default app