import mongoose from "mongoose"

const Schema = mongoose.Schema
const OrderShema = new mongoose.Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User ID requis'],
    },
    drone_id: {
        type: Schema.Types.ObjectId,
        ref: 'Drone',
        required: [true, 'Drone ID requis']
    },
    startAt_o: {
        type: Date,
        required: [true, 'Date de début de commande requise']
    },
    endAt_o: {
        type: Date,
        required: [true, 'Date de fin de commande requise'],
    },
    report_o: {
        
        type: String,
        trim: true
    },
    createdBy_o: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User ID requis']
    },
    updateBy_o: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    state_o: {
        type: String,
        enum: ['En attente', 'Acceptée', 'Rejetée', 'Terminée'],
        default: 'En attente'
    }
}, { versionKey: false, timestamps: true }
)

const Order = mongoose.model('Order', OrderShema)

export default Order