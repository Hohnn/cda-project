import mongoose from 'mongoose'


const ImageSchema = new mongoose.Schema({
    name: String,
    img:
    {
        data: Buffer,
        contentType: String
    }
}, { versionKey: false, timestamps: true })

const Image = mongoose.model('Image', ImageSchema)

export default Image