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
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
//#region Express

dotenv.config()
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.set("view engine", "ejs");

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

 
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
 
var upload = multer({ storage: storage });

app.get('/images', (req, res, next) => {
  Image.find({}, (err, items) => {
      if (err) {
          console.log(err);
          return next(new AppError(err.message, 500), err);
      }
      else {
          res.render('imagePage.ejs', { items: items });
      }
  });
});

app.post('/images', upload.single('image'), (req, res, next) => {
  var obj = {
      name: req.body.name,
      desc: req.body.desc,
      img: {
          data: fs.readFileSync(path.join(__dirname + '/images/' + req.file.filename)),
          contentType: 'image/png'
      }
  }
  Image.create(obj, (err, item) => {
      if (err) {
          console.log(err);
      }
      else {
          item.save();
          res.redirect('/images');
      }
  });
});

//#endregion
app.all('*', (req, res, next) => {
  next(new AppError(`Cette adresse : ${req.originalUrl} n'est pas disponible sur ce serveur.`, 404))
})

app.use(globalErrorHandler)

app.listen(PORT, () => {
  console.log("Server is running on port: %s (HTTP)", PORT)
})


