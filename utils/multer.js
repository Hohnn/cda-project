import multer from "multer"

const maxSize = 2 * 1024 * 1024 // 2MB

const MIME_TYPES = {
  'image/jpeg': 'jpg',
  'image/png': 'png'
}
const upload = multer({
  storage: multer.diskStorage({
    //sauvegarde dans le dossier images
    destination: (req, file, cb) => {
      cb(null, 'images')
    },
    //renomme le fichier
    filename: (req, file, cb) => {
      const name = file.originalname.split(".").join("_")
      cb(null, `${Date.now()}-${name}.${MIME_TYPES[file.mimetype]}`)
    }
  }),
  //verifie le type de fichier
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/') && MIME_TYPES[file.mimetype]) {
      cb(null, true)
    } else {
      cb(new AppError('Ce n\'est pas une image!', 400), false)
    }
  },
  //limite la taille du fichier
  limits: {
    fileSize: maxSize
  }
})

export default upload
