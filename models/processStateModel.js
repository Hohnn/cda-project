import mongoose from 'mongoose'

const ProcessSateSchema = new mongoose.Schema({
    name_ps: {
        type: String,
        required: [true, 'Name is required'],
    },
    description_ps: {
        type: String,
        required: [true, 'Description is required'],
    },
    key_ps: {
        type: Number,
        required: [true, 'Key code is required'],
        unique: true
    }
})

const ProcessStateModel = mongoose.model('ProcessState', ProcessSateSchema)

export default ProcessStateModel 
