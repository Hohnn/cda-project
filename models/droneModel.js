import mongoose from "mongoose"

const Schema = mongoose.Schema
const DroneShema = new mongoose.Schema({
    name_d:{
        type: String,
        require: true,
        trim: true,
        lowercase: true
    },
    category_id:{
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    description_d:{
        type: String,
        require: true,
        trim: true,
        lowercase: true
    },
    pricePerDay_d:{
        type: Number,
        require: true,
        trim: true,
        lowercase: true
    }
})

const Drone = mongoose.model('Drone', DroneShema)

export default Drone