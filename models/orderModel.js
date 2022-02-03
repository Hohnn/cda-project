import mongoose from "mongoose"

const Schema = mongoose.Schema
const OrderShema = new mongoose.Schema({
    user_id:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    drone_id:{
        type: Schema.Types.ObjectId,
        ref: 'Drone',
        required: true
    },
    startAt_o:{
        type: Date,
        require: true,
    },
    endAt_o:{
        type: Date,
        require: true,
    },
    report_o:{
        type: String,
        require: true,
        trim: true,
        lowercase: true
    },
    createdBy_o:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt_o:{
        type: Date,
        require: true,
        default: Date.now
    },
    updateBy_o:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    updateAt_o:{
        type: Date,
    },
})

const Order = mongoose.model('Order', OrderShema)

export default Order