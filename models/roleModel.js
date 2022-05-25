import mongoose from 'mongoose'

const RoleSchema = new mongoose.Schema({
    name_r: {
        type: String,
        enum: ['Directeur', 'Support Technique', 'Client Web', 'Testeur'],
        required: [true, 'Nom requis']
    },
    key_r: {
        type: Number,
        enum: [1, 2, 3, 0],
        required: [true, 'Clé requise']
    }
}, { versionKey: false, timestamps: true })

const RoleModel = mongoose.model('Role', RoleSchema)

export default RoleModel