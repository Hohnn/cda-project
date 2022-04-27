import fs from 'fs';
import uploadFile from "../middleware/upload.js"
// import path from 'path'
// import { fileURLToPath } from 'url'

// const __filename = fileURLToPath(import.meta.url)
// const __basedir = path.dirname(__filename)
/*
upload() :
use middleware function for file upload
catch Multer error (in middleware function)
return response with message
*/
export const upload = async (req, res) => {
    res.status(200).send({
        message: "Fichier téléchargé avec succès: " + req.file.originalname,
    })
    // try {
    //     await uploadFile(req, res)
    //     if (req.file == undefined) {
    //         return res.status(400).send({ message: "Choisissez un fichier quand même!" })
    //     }
    // } catch (err) {
    //     if (err.code == "LIMIT_FILE_SIZE") {
    //         return res.status(500).send({
    //           message: "Le fichier ne peut pas dépasser 8MB!",
    //         });
    //     }
    //     res.status(500).send({
    //         message: `Téléchargement impossible: ${req.file.originalname}. ${err}`,
    //     })
    // }
};

/*
getListFiles():
read all files in uploads folder, 
return list of files’ 
information (name, url)
*/
// export const getListFiles = (req, res) => {
//     const directoryPath = "../images/"
//     fs.readdir(directoryPath, function (err, files) {
//         if (err) {
//             res.status(500).send({
//                 message: "Le fichier ne peut pas être vérifié!",
//             })
//         }
//         let fileInfos = []
//         files.forEach((file) => {
//             fileInfos.push({
//                 name: file,
//                 url: baseUrl + file,
//             })
//         })
//         res.status(200).send(fileInfos)
//     })
// }

/*
download(): 
receives file name as input parameter, 
then uses Express res.download API to transfer the file 
at path (directory + file name) as an ‘attachment’.
*/
// export const download = (req, res) => {
//     const fileName = req.params.name
//     const directoryPath = "../images/"
//     res.download(directoryPath + fileName, fileName, (err) => {
//         if (err) {
//             res.status(500).send({
//                 message: "Téléchargement impossible. " + err,
//             })
//         }
//     })
// }