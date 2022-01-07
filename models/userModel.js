import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
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
