import mongoose from 'mongoose'

const CategorySchema = new mongoose.Schema({
    name_cat: {
        type: String,
        required: true,
        lowercase: true
    },
    description_cat: {
        type: String,
        required: true,
        lowercase: true
    },
    key_cat: {
        type: Number,
        required: true,
        unique: true
    }
})

const CategoryModel = mongoose.model('Category', CategorySchema)

export default CategoryModel
