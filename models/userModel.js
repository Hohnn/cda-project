import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const Schema = mongoose.Schema
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email requis'],
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'Mot de passe requis'],
        minlength: [8, 'Password must be at least 8 characters long']
    },
    firstName_u: {
        type: String,
        required: [true, 'Nom requis']
    },
    lastName_u: {
        type: String,
        required: [true, 'Prénom  requis']
    },
    company_u: {
        type: String,
        required: [true, 'Entreprise requis']
    },
    key_r: {
        type: Number,
        required: [true, 'Key role requis']
    },
    siret_u: {
        type: String,
        required: [true, 'Siret requis']
    },
    address_u: {
        type: String,
        required: [true, 'Adresse requise']
    },
    phone_u: {
        type: String,
        required: [true, 'Téléphone requis']
    },
    createBy_id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    updateBy_id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

},
    {
        timestamps: true
    })

// Pré Hook - actions avant l'enregistrement dans la base de données MongoDB
//hashage de mot de passe:
UserSchema.pre('save', async function (next) {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

// Ajouter une méthode pour vérifier le mot de passe
UserSchema.methods.isValidPassword = async function (password) {
    const user = this
    return await bcrypt.compare(password, this.password) //return true or false
}

UserSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()
    delete userObject.password
    delete userObject.passwordConfirm
    return userObject
}

UserSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })
    if (!user) {
        throw new Error('Impossible de se connecter')
    }
    const isMatch = await user.isValidPassword(password)
    if (!isMatch) {
        throw new Error('Impossible de se connecter')
    }
    return user
}

const UserModel = mongoose.model('User', UserSchema)

export default UserModel 