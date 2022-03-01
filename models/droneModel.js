import mongoose from "mongoose"

const Schema = mongoose.Schema
const DroneShema = new mongoose.Schema({
    name_d:{
        type: String,
        require: [true, 'Name is required'],
        trim: true,
        lowercase: true
    },
    category_id:{
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    description_d:{
        type: String,
        require: [true, 'Description is required'],
        trim: true,
        lowercase: true
    },
    pricePerDay_d:{
        type: Number,
        require: [true, 'Price per day is required'],
        trim: true,
        lowercase: true
    },
    processState_id:{
        type: Schema.Types.ObjectId,
        ref: 'ProcessState'
    }
})

const Drone = mongoose.model('Drone', DroneShema)

export default Drone