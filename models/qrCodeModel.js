import Mongoose from "mongoose"

const qrCodeSchema = new Mongoose.Schema({
    src: {
        type: String,
        unique: true,
        required: [true, 'Source in URL format is required'],
        trim: true
    },
    qr_code: {
        type: String,
        unique: true
    }
}, { versionKey: false, timestamps: true }
)

const QrCodeModel = Mongoose.model('QrCode', qrCodeSchema)
export default QrCodeModel
