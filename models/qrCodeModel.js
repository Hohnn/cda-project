import mongoose from "mongoose"

const Schema = mongoose.Schema
const qrCodeSchema = new mongoose.Schema({
    src: {
        type: String,
        unique: true,
        required: [true, 'Source in URL format is required'],
        trim: true
    },
    qr_code: {
        type: String,
        unique: true
    },
    drone_id: {
        type: String,
        required: [true, 'Drone_id is required'],
    }
}, { versionKey: false, timestamps: true }
)

const QrCodeModel = mongoose.model('QrCode', qrCodeSchema)
export default QrCodeModel
