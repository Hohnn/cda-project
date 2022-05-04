import mongoose from 'mongoose'

const CategorySchema = new mongoose.Schema({
    name_cat: {
        type: String,
        required: [true, 'Category name is required'],
        uppercase: true
    },
    description_cat: {
        type: String,
        required: [true, 'Description is required'],
        lowercase: true
    },
    key_cat: {
        type: Number,
        required: [true, 'Key category is required']
    }
})

const CategoryModel = mongoose.model('Category', CategorySchema)

export default CategoryModel
