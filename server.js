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
import path from 'path'
import fs from 'fs'
import multer from 'multer'
import Image from './models/imageModel.js'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
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



//#endregion

//#region upload

// Multer configuration
const maxSize = 8 * 1024 * 1024 // 8MB

const MIME_TYPES = {
  'image/jpeg': 'jpg',
  'image/png': 'png'
}
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './images')
    },
    filename: (req, file, cb) => {
      const name = file.originalname.split(".").join("_")
      cb(null, `${Date.now()}-${name}.${MIME_TYPES[file.mimetype]}`)
    }
  }),
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true)
    } else {
      cb(new AppError('Ce n\'est pas une image!', 400), false)
    }
  },
  limits: {
    fileSize: maxSize
  }
})


app.get('/images', (req, res, next) => {
  Image.find({}, (err, images) => {
    if (err) {
      return next(new AppError(err.message, 500), err)
    }
    res.send(
      images.map(image => {
        return {
          id: image._id,
          name: image.name,
          img: image.img
        }
      })
    )
  })
})

app.get('/images/:idImage', (req, res, next) => {
  Image.findById(req.params.idImage, (err, item) => {
    if (err) {
      return next(new AppError(err.message, 500), err)
    }
    res.send(item)
  })
})

app.post('/images', upload.single('image'), (req, res, next) => {
  var obj = {
    name: req.file.filename,
    img: {
      data: fs.readFileSync(path.join(__dirname + '/images/' + req.file.filename)),
      contentType: req.file.mimetype
    }
  }
  Image.create(obj, (err, item) => {
    if (err) {
      return next(new AppError(err.message, 500), err)
    }
    item.save()
    res.status(201).send({
      message: "Image uploaded successfully",
      id: item._id,
      name: item.name
    })
  })
})

app.delete('/images/:id', (req, res, next) => {
  Image.findByIdAndRemove(req.params.id, (err, item) => {
    console.log(item)
    if (!item || err) {
      return next(new AppError('Une erreur est survenue', 400))
    }
    res.send({
      message: 'Image supprimée!'
    })
    fs.unlink(path.join(__dirname + '/images/' + item.name), (err) => {
      if (err) {
        console.log(`Erreur de suppression de l\'image: ${err}`)
      }
    })
  })
})



//#endregion
app.all('*', (req, res, next) => {
  next(new AppError(`Cette adresse : ${req.originalUrl} n'est pas disponible sur ce serveur.`, 404))
})

app.use(globalErrorHandler)

app.listen(PORT, () => {
  console.log("Server is running on port: %s (HTTP)", PORT)
})


