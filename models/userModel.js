import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const Schema = mongoose.Schema
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be at least 8 characters long']
    },
    firstName_u: {
        type: String,
        required: [true, 'First name is required']
    },
    lastName_u: {
        type: String,
        required: [true, 'Last name is required']
    },
    company_u: {
        type: String,
        required: [true, 'Company is required']
    },
    siret_u: {
        type: String,
        required: [false, 'Siret is required']
    },
    address_u: {
        type: String,
        required: [false, 'Address is required']
    },
    phone_u: {
        type: String,
        required: [true, 'Phone is required']
    },
    role_id: { // type en id et ref en nom de la collection
        type: Schema.Types.ObjectId,
        ref: 'Role'
    }, 
    createBy_id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    createAt_u: {
        type: Date,
        required: true,
        default: Date.now
    },
    updateBy_id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    updateAt_u: {
        type: Date,
        required: true,
        default: Date.now
    }
})

// Pré Hook - actions avant l'enregistrement dans la base de données MongoDB
//hashage de mot de passe:
UserSchema.pre('save', async function (next) {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
} )

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
        throw new Error('Unable to login')
    }
    const isMatch = await user.isValidPassword(password)
    if (!isMatch) {
        throw new Error('Unable to login')
    }
    return user
}



const UserModel = mongoose.model('User', UserSchema)

export default UserModel 