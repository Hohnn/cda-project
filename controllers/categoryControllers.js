import CategoryModel from '../models/categoryModel.js'
import AppError from '../utils/AppError.js'

export const addCategory = async (req, res, next) => {
    const category = new CategoryModel(req.body)
    const isAlreadyExist = await CategoryModel.findOne({ name_cat: category.name_cat })
    await category.save()
    if (isAlreadyExist) {
        return next(new AppError(`Cette catégorie existe déjà.`, 400))
    } else if (!category || !category.name_cat || !category.description_cat || !category.max_weight || !category.max_altitude || !category.fly_type || !category.key) {
        return next(new AppError(`Erreur lors de la création de la catégorie.`, 400))
    } else {
        res.status(201).send({
            message: 'Catégorie créée avec succès',
            category: category
        }
        )
    }
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
        return next(new AppError(`Aucune catégorie trouvée.`, 404))
    }
    res.send(category)
}

export const updateCategory = async (req, res, next) => {
    const category = await CategoryModel.findByIdAndUpdate(req.params.idCategory, req.body)
    await category.save()
    if (!category || category === null || category === undefined || category === '') {
        return next(new AppError(`Aucune catégorie trouvée.`, 404))
    } else {
        res.send({
            message: `Catégorie ${category.name_cat} modifiée avec succès.`,
            category: category
        })
    }
}

export const deleteCategory = async (req, res, next) => {
    const category = await CategoryModel.findByIdAndDelete(req.params.idCategory)
    if (!category || category === null || category === undefined || category === '') {
        return next(new AppError(`Aucune catégorie trouvée.`, 404))
    } else {
        res.status(204).send({
            message: `Catégorie ${category.name_cat} supprimée avec succès.`
        })
    }
}

