import mongoose from "mongoose"

const Schema = mongoose.Schema
const OrderShema = new mongoose.Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User _id is required'],
    },
    drone_id: {
        type: Schema.Types.ObjectId,
        ref: 'Drone',
        required: [true, 'Drone _id is required']
    },
    startAt_o: {
        type: Date,
        required: [true, 'Order start date is required']
    },
    endAt_o: {
        type: Date,
        required: true,
    },
    report_o: {
        type: String,
        trim: true
    },
    createdBy_o: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User _id is required'],
    },
    updateBy_o: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    state_o: {
        type: String,
        enum: ['pending', 'accepted', 'rejected', 'finished'],
        default: 'pending'
    }
},
    {
        timestamps: true
    }
)

const Order = mongoose.model('Order', OrderShema)

export default Order