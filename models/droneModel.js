import mongoose from "mongoose"

const Schema = mongoose.Schema
const DroneShema = new mongoose.Schema({
    name_d: {
        type: String,
        require: [true, 'Nom requis'],
        trim: true,
        lowercase: true
    },
    category_id: {
        type: Schema.Types.ObjectId,
        require: [true, 'Category ID requis'],
        ref: 'Category'
    },
    description_d: {
        type: String,
        require: [true, 'Description requise'],
        trim: true,
        lowercase: true
    },
    pricePerDay_d: {
        type: Number,
        require: [true, 'Prix par jour requis'],
        trim: true,
        lowercase: true
    },
    state: {
        type: String,
        enum: ['Disponible', 'Indisponible'],
        default: 'Disponible'
    }
})

const Drone = mongoose.model('Drone', DroneShema)

export default Drone