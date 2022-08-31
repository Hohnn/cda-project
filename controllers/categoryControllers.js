import CategoryModel from '../models/categoryModel.js'
import AppError from '../utils/AppError.js'

export const addCategory = async (req, res, next) => {
    // if (req.user.key_r > 2) {
//        return next(new AppError(`Vous n'êtes // pas autorisé à effectuer cette action.`, 403))
//     }

    const category = new CategoryModel(req.body)
    const isAlreadyExist = await CategoryModel.findOne({ name_cat: category.name_cat })

    await category.save()
    if (isAlreadyExist) {
        return next(new AppError(`Cette catégorie existe déjà.`, 400))
    }
    if (!category || !category.name_cat || !category.description_cat || !category.max_weight || !category.max_altitude || !category.fly_type || !category.key) {
        return next(new AppError(`Erreur lors de la création de la catégorie.`, 400))
    }
    res.status(201).send({
        message: 'Catégorie créée avec succès',
        category: category
    }
    )
}



export const getAllCategories = async (req, res, next) => {
    const categories = await CategoryModel.find({})
    if (!categories || categories === null || categories === undefined || categories === '') {
        return next(new AppError(`Aucune catégories trouvées.`, 200))
    }
    res.send(categories)
}

export const getCategory = async (req, res, next) => {
    const category = await CategoryModel.findById(req.params.idCategory)

    if (!category || category === null || category === undefined || category === '') {
        return next(new AppError(`Aucune catégorie trouvée.`, 200))
    }
    res.send(category)
}

export const updateCategory = async (req, res, next) => {
    // if (req.user.key_r > 2) {
//        return next(new AppError(`Vous n'êtes // pas autorisé à effectuer cette action.`, 403))
//     }

    const category = await CategoryModel.findByIdAndUpdate(req.params.idCategory, req.body)
    
    if (!category || category === null || category === undefined || category === '') {
        return next(new AppError(`Aucune catégorie trouvée.`, 200))
    }
    
    await category.save()
    res.send({
        message: `Catégorie ${category.name_cat} modifiée avec succès.`,
        category: category
    })
}

export const deleteCategory = async (req, res, next) => {
    // if (req.user.key_r !== 1) {
    //     return next(new AppError(`Vous n'êtes pas autorisé à effectuer cette action.`, 403))
    // }

    const category = await CategoryModel.findByIdAndDelete(req.params.idCategory)

    if (!category || category === null || category === undefined || category === '') {
        return next(new AppError(`Aucune catégorie trouvée.`, 200))
    } else {
        res.status(200).send({
            message: `Catégorie ${category.name_cat} supprimée avec succès.`
        })
    }
}

