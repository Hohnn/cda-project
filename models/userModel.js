import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const Schema = mongoose.Schema
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    firstName_u: {
        type: String,
        required: true
    },
    lastName_u: {
        type: String,
        required: true
    },
    company_u: {
        type: String,
        required: true
    },
    siret_u: {
        type: String,
        required: false
    },
    address_u: {
        type: String,
        required: false
    },
    phone_u: {
        type: String,
        required: true
    },
    role_id: { // type en id et ref en nom de la collection
        type: Schema.Types.ObjectId,
        ref: 'Role'
    }, 
    createBy_id: {
        type: String,
        required: false
    },
    createAt_u: {
        type: Date,
        required: true,
        default: Date.now
    },
    updateBy_id: {
        type: String,
        required: false
    },
    updateAt_u: {
        type: Date,
        required: true,
        default: Date.now
    }  

})

// Pré Hook - Avant l'enregistrement dans la base de données

UserSchema.pre('save', async function (next) {
    const user = this
    
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
} )

// Ajouter une méthode pour vérifier le mot de passe

UserSchema.methods.isValidPassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

const UserModel = mongoose.model('User', UserSchema)

export default UserModel 
