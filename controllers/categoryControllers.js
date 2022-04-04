import CategoryModel from '../models/categoryModel.js'
import AppError from '../utils/AppError.js'

export const addCategory = async (req, res, next) => {
    const category = new CategoryModel(req.body)
    await category.save()
        res.status(201).send({
        message: 'Catégorie créée avec succès',
        category: category
    })
}

export const getAllCategories = async (req, res, next) => {
    const categories = await CategoryModel.find({})
    if(!categories || categories === null || categories === undefined || categories === '') {
        return next(new AppError(`Aucune catégorie ${req.params.idCategory} trouvée.`, 404))
    }    
    res.send(categories)
}

export const getCategory = async (req, res, next) => {
    const category = await CategoryModel.findById(req.params.idCategory)
    if(!category || category === null || category === undefined || category === '') {
        return next(new AppError(`Aucune catégorie ${req.params.idCategory} trouvée.`, 404))
        }
        res.send(category)
}

export const updateCategory = async (req, res) => {
    const category = await CategoryModel.findByIdAndUpdate(req.params.idCategory, req.body)
    if(!category || category === null || category === undefined || category === '') {
        return next(new AppError(`Aucune catégorie ${req.params.idCategory} trouvée.`, 404))
    }    
    await category.save()
    res.send({
        message: `Catégorie ${req.params.idCategory} modifiée avec succès.`,
        category: category
    })
}

export const deleteCategory = async (req, res) => {
    const category = await CategoryModel.findByIdAndDelete(req.params.idCategory)
    if(!category || category === null || category === undefined || category === '') {
        return next(new AppError(`Aucune catégorie ${req.params.idCategory} trouvée.`, 404))
    }    
    res.status(204).send({
        message: `Catégorie ${req.params.idCategory} supprimée avec succès.`
    })
}

