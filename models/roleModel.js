import mongoose from 'mongoose'

const RoleSchema = new mongoose.Schema({
    name_r: {
        type: String,
        required: [true, 'Name is required'],
        lowercase: true
    },
    description_r: {
        type: String,
        required: [true, 'Description is required'],
        lowercase: true
    },
    key_r: {
        type: Number,
        required: [true, 'Key is required']
    }
})

const RoleModel = mongoose.model('Role', RoleSchema)

export default RoleModel