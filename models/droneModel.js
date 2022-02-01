import mongoose from "mongoose"

const DroneShema = new mongoose.Schema({
    name:{
        type: String,
        require: true,
        trim: true,
        lowercase: true
    },
    category:{
        type: String,
        require: false,
        trim: true,
        lowercase: true
    },
    description:{
        type: String,
        require: false,
        trim: true,
        lowercase: true
    },
    pricePerDay:{
        type: Number,
        require: false,
        trim: true,
        lowercase: true
    }
    // maxPersons: {
    //     type: Number,
    //     default: 1,
    //     validate: value => {
    //         if (value <= 0) {
    //             throw new Error('La chambre doit accueillir au moins une personne.')
    //         }
    //     }
    // }
})

const Drone = mongoose.model('Drone', DroneShema)

export default Drone