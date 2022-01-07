import mongoose from 'mongoose'

const RoleSchema = new mongoose.Schema({
    name_r: {
        type: String,
        required: true,
        lowercase: true
    },
    description_r: {
        type: String,
        required: true,
        lowercase: true
    },
    key_r: {
        type: Number,
        required: true,
        unique: true
    }
})

const RoleModel = mongoose.model('Role', RoleSchema)

export default RoleModel
