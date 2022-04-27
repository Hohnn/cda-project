
import { promisify } from "util"
import multer from "multer"

// Multer configuration
const maxSize = 8 * 1024 * 1024 // 8MB
const MIME_TYPE = {
    "images/jpg" : "jpg",
    "images/jpeg" : "jpeg",
    "images/png" : "png",
    "images/gif" : "gif"
}

const storage = multer.diskStorage({ 
    //destination determines folder to store the uploaded files.
    destination: (req, file, cb) => {
        cb(null,"./images")
    },
    //filename determines the name of the file inside the destination folder.
    filename: (req, file, cb) => {
        const name = file.originalname.split(" ").join("_");
        const extension = MIME_TYPE[file.mimetype]
        cb(null, name + "_" + Date.now() + '.' + extension)
    },
})

//We can add limits: { fileSize: maxSize } to the object passed to multer() to restrict file size.
let uploadFile = multer(
    {
        storage: storage,
        limits: { fileSize: maxSize },
    }).single("image")

//promisify() makes the exported middleware object can be used with async-await.
// const uploadFileMiddleware = promisify(uploadFile)

export default uploadFile