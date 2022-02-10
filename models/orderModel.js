import mongoose from "mongoose"

const Schema = mongoose.Schema
const OrderShema = new mongoose.Schema({
    user_id:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User _id is required'],
    },
    drone_id:{
        type: Schema.Types.ObjectId,
        ref: 'Drone',
        required: [true, 'Drone _id is required']
    },
    startAt_o:{
        type: Date,
        required: [true, 'Order start date is required']
    },
    endAt_o:{
        type: Date,
        required: true,
    },
    report_o:{
        type: String,
        required: [true,'Report is required'],
        trim: true,
        lowercase: true
    },
    createdBy_o:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User _id is required'],
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
        default: Date.now
    },
})

const Order = mongoose.model('Order', OrderShema)

export default Order