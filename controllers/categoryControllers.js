import CategoryModel from '../models/categoryModel.js'

export const addCategory = async (req, res) => {
    const category = new CategoryModel(req.body)
    await category.save()
    res.status(201).send({
        message: 'Catégorie créé avec succès',
        category: category
    })
}

export const getAllCategories = async (req, res) => {
    const categories = await CategoryModel.find({})
    if (!categories) {
        res.status(404).send({
            message: 'Aucune catégorie trouvée.'
        })
    }
    res.send(categories)
}

export const getCategory = async (req, res) => {
    const category = await CategoryModel.find({ _id: req.params.idCategory })
    if (!category) {
        res.status(404).send({ message: 'Aucune catégorie trouvée.' })
    }
    res.send(category)
}

export const updateCategory = async (req, res) => {
    const category = await CategoryModel.findByIdAndUpdate(req.params.idCategory, req.body)
    if (!category) {
        res.status(404).send({ message: 'Aucune catégorie trouvée.' })
    }
    await category.save()
    res.send({
        message: 'Catégorie modifiée avec succès.',
        category: category
    })
}

export const deleteCategory = async (req, res) => {
    const category = await CategoryModel.findByIdAndDelete(req.params.idCategory)
    if (!category) {
        res.status(404).send({
            message: 'Aucune catégorie trouvée.'
        })
    }
    res.send({
        message: 'Catégorie supprimée avec succès.'
    })
}

