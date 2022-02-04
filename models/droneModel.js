import mongoose from "mongoose"

const Schema = mongoose.Schema
const DroneShema = new mongoose.Schema({
    name_d:{
        type: String,
        require: true,
        trim: true,
        lowercase: true
    },
<<<<<<< HEAD
    category:{
        type: String,
        require: false,
        trim: true,
        lowercase: true
=======
    category_id:{
        type: Schema.Types.ObjectId,
        ref: 'Category'
>>>>>>> 584a0ebcaef9d6dbf4ca005b57376866276e01c4
    },
    description_d:{
        type: String,
        require: false,
        trim: true,
        lowercase: true
    },
    pricePerDay_d:{
        type: Number,
        require: false,
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