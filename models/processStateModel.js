import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const ProcessSateSchema = new mongoose.Schema({
    name_ps: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }

})

const ProcessStateModel = mongoose.model('ProcessState', ProcessSateSchema)

export default ProcessStateModel 
