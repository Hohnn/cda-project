import mongoose from 'mongoose'

const RoleSchema = new mongoose.Schema({
    name_r: {
        type: String,
        enum: ['admin', 'user', 'customer'],
        required: [true, 'Name is required']
    },
    key_r: {
        type: Number,
        enum: [1, 2, 3],
        required: [true, 'Key is required']
    }
})

const RoleModel = mongoose.model('Role', RoleSchema)

export default RoleModel