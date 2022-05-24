import qrCodeModel from '../models/qrCodeModel.js'
import AppError from '../utils/AppError.js'
import qrcode from 'qrcode'

export const getQrCode = async (req, res, next) => {
    const qrCode = await qrCodeModel.findById(req.params.idQrCode)
    if (!qrCode) {
        return next(new AppError(`Aucun QrCode ${req.params.idQrCode} trouvé.`, 404))
    }
    res.send({ qrCode })
}

export const addQrCode = async (req, res, next) => {
    const qrCode = new qrCodeModel(req.body)
    const url = req.body.src

    qrcode.toDataURL(url, (error, src) => {
        try {
            if (error) {
                throw error
            }
            qrCode.src = url
            qrCode.qr_code = src
            qrCode.save()
                .then(() => {
                    res.status(201).send({
                        message: 'QrCode created',
                        qrCode: qrCode
                    })
                })
                .catch(error => {
                    return next(new AppError(`Erreur lors de la création du QrCode.`, 400), error)
                })
        } catch (error) {
            return next(new AppError(`Erreur lors de la création du QrCode.`, 400), error)
        }
    })
}


export const getAllQrCodes = async (req, res) => {
    const qrCodes = await qrCodeModel.find({})
    if(!qrCodes || qrCodes.length === 0 || qrCodes === null || qrCodes === undefined || qrCodes === ''){
        return next(new AppError(`Aucun QrCode trouvé.`, 404))
    }
    res.send(qrCodes)
}

export const deleteQrCode = async (req, res, next) => {
    const qrCode = await qrCodeModel.findByIdAndDelete(req.params.idQrCode)
    console.log(qrCode)
    if (!qrCode || qrCode.length === 0 || qrCode === null || qrCode === undefined || qrCode === '') {
        return next(new AppError(`Aucun QrCode ${req.params.idQrCode} trouvé.`, 404))
    }
    res.status(200).send({
        message: `QR Code ${req.params.idQrCode} supprimé.`
    })
}