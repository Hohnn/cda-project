import qrCodeModel from '../models/qrCodeModel.js'
import AppError from '../utils/AppError.js'
import qrcode from 'qrcode'

export const getQrCode = async (req, res, next) => {
    // if (req.user.key_r > 2) {
    //        return next(new AppError(`Vous n'êtes // pas autorisé à effectuer cette action.`, 403))
    //     }

    const qrCode = await qrCodeModel.findById(req.params.idQrCode)
    if (!qrCode) {
        return next(new AppError(`Aucun QR code ${req.params.idQrCode} trouvé.`, 404))
    }
    res.send({ qrCode })
}

export const getQrCodeWithDroneId = async (req, res, next) => {
    const drone_QR = await qrCodeModel.findOne({ drone_id: req.params.idDrone })
    if (!drone_QR) {
        return next(new AppError(`Aucun QR code pour ce drone ${req.params.idDrone} trouvé.`, 404))
    }
    res.send({drone_QR})
}

export const addQrCode = async (req, res, next) => {

    const qrCode = new qrCodeModel(req.body)
    const url = req.body.src
    const drone_id = req.body.drone_id


    qrcode.toDataURL(url, (error, src) => {
        try {
            if (error) {
                throw error
            }
            qrCode.src = url
            qrCode.qr_code = src
            qrCode.drone_id = drone_id
            qrCode.save()
                .then(() => {
                    res.status(201).send({
                        message: 'QR Code créé.',
                        qrCode: qrCode
                    })
                })
                .catch(error => {
                    return next(new AppError(`Opération impossible, QR code éxistant pour ce drone ${qrCode.drone_id}.`, 400), error)
                })
        } catch (error) {
            return next(new AppError(`Erreur lors de la création du QR code, veuillez contacter votre administrateur système.`, 400), error)
        }
    })
}


export const getAllQrCodes = async (req, res, next) => {
    // if (req.user.key_r > 2) {
    //        return next(new AppError(`Vous n'êtes pas autorisé à effectuer cette action.`, 403))
    //     }
    const qrCodes = await qrCodeModel.find({})
    if (!qrCodes || qrCodes.length === 0 || qrCodes === null || qrCodes === undefined || qrCodes === '')
        return next(new AppError(`Aucun QR code trouvé.`, 404))

    res.send(qrCodes)
}

export const deleteQrCode = async (req, res, next) => {
    // if (req.user.key_r > 2) {
    //        return next(new AppError(`Vous n'êtes // pas autorisé à effectuer cette action.`, 403))
    //     }

    const qrCode = await qrCodeModel.findByIdAndDelete(req.params.idQrCode)

    if (!qrCode || qrCode.length === 0 || qrCode === null || qrCode === undefined || qrCode === '') {
        return next(new AppError(`Aucun QR code ${req.params.idQrCode} trouvé.`, 404))
    }
    res.status(200).send({
        message: `QR Code supprimé.`
    })
}