import qrCodeModel from '../models/qrCodeModel.js'
import qrcode from 'qrcode'

export const getQrCode = async (req, res) => {
    const qrCode = await qrCodeModel.findById(req.params.idQrCode)
    if (!qrCode) {
        res.status(404).send({ message: 'QrCode not found.' })
        return
    }
    res.send(qrCode)
}

export const addQrCode = async (req, res) => {
    const qrCode = new qrCodeModel(req.body)
    const url = req.body.src

    qrcode.toDataURL(url, (err, src) => {
        try {
            if (err) {
                throw err
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
                    res.status(400).send({
                        message: 'QrCode not created',
                        error: error
                    })
                })
        } catch (error) {
            res.status(400).send({
                message: 'QrCode not created',
                error: error
            })
        }
    })
}

export const getAllQrCodes = async (req, res) => {
    const qrCodes = await qrCodeModel.find({})
    res.send(qrCodes)
}