import multer from "multer"

const maxSize = 4 * 1024 * 1024 // 4MB

const MIME_TYPES = {
  'image/jpeg': 'jpg',
  'image/png': 'png'
}
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'images')
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

export default upload