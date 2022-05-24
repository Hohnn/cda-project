import mongoose from 'mongoose'

const Schema = mongoose.Schema
const RoleSchema = new mongoose.Schema({
    name_r: {
        type: String,
        enum: ['Administrateur', 'Utilisateur', 'Client Web', 'Testeur'],
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