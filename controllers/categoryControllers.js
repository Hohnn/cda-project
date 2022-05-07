import CategoryModel from '../models/categoryModel.js'
import AppError from '../utils/AppError.js'

export const addCategory = async (req, res, next) => {
    const category = new CategoryModel(req.body)
    await category.save()
    if(!category) {
        return next(new AppError(`Erreur lors de la création de la catégorie.`, 400))
    }
    res.status(201).send({
        message: 'Catégorie créée avec succès',
        category: category
    })
}

export const getAllCategories = async (req, res, next) => {
    const categories = await CategoryModel.find({})
    if (!categories || categories === null || categories === undefined || categories === '') {
        return next(new AppError(`Aucune catégories trouvées.`, 404))
    }
    res.send(categories)
}

export const getCategory = async (req, res, next) => {
    const category = await CategoryModel.findById(req.params.idCategory)

    if (!category || category === null || category === undefined || category === '') {
        return next(new AppError(`Aucune catégorie ${category.name_cat} trouvée.`, 404))
    }
    res.send(category)
}

export const updateCategory = async (req, res, next) => {
    const category = await CategoryModel.findByIdAndUpdate(req.params.idCategory, req.body)
    if (!category || category === null || category === undefined || category === '') {
        return next(new AppError(`Aucune catégorie ${category.name_cat} trouvée.`, 404))
    }
    await category.save()
    res.send({
        message: `Catégorie ${category.name_cat} modifiée avec succès.`,
        category: category
    })
}

export const deleteCategory = async (req, res) => {
    const category = await CategoryModel.findByIdAndDelete(req.params.idCategory)
    if (!category || category === null || category === undefined || category === '') {
        return next(new AppError(`Aucune catégorie ${category.name_cat} trouvée.`, 404))
    }
    res.status(204).send({
        message: `Catégorie ${category.name_cat} supprimée avec succès.`
    })
}

