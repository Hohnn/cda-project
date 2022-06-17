import RoleModel from '../models/roleModel.js'
import AppError from '../utils/AppError.js'

export const getRoles = async (req, res, next) => {
    // if (req.user.key_r > 2) {
//        return next(new AppError(`Vous n'êtes // pas autorisé à effectuer cette action.`, 403))
//     }
    const roles = await RoleModel.find({})
    if (!roles) {
        return next(new AppError(`Aucun rôle trouvé.`, 404))
    }
    res.send(roles)
}

export const getRole = async (req, res, next) => {
    // if (req.user.key_r > 2) {
//        return next(new AppError(`Vous n'êtes // pas autorisé à effectuer cette action.`, 403))
//     }
    const roles = await RoleModel.find({ _id: req.params.idRole })
    if (!roles || roles.length === 0 || roles === null || roles === undefined || roles === '') {
        return next(new AppError(`Aucun rôle trouvé.`, 404))
    }
    res.send(roles)
}

export const addRole = async (req, res, next) => {
    // if (req.user.key_r > 2) {
//        return next(new AppError(`Vous n'êtes // pas autorisé à effectuer cette action.`, 403))
//     }

    const roles = new RoleModel(req.body)
    const isAlreadyExist = await RoleModel.findOne({ name_r: roles.name_r })

    if (!roles) {
        return next(new AppError(`Erreur lors de la création du rôle.`, 400))
    }
    if (isAlreadyExist) {
        return next(new AppError(`Ce rôle existe déjà.`, 400))
    }
    await roles.save()
    res.status(201).send({
        message: 'Rôle créé avec succès',
        roles: roles
    })
}


export const updateRole = async (req, res, next) => {
    // if (req.user.key_r > 2) {
//        return next(new AppError(`Vous n'êtes // pas autorisé à effectuer cette action.`, 403))
//     }

    const roles = await RoleModel.findByIdAndUpdate(req.params.idRole, req.body)

    if (!roles || roles.length === 0 || roles === null || roles === undefined || roles === '') {
        return next(new AppError(`Aucun rôle trouvé.`, 404))
    }
    await roles.save()
    res.send({ message: 'Rôle mis à jour avec succès', role: roles })
}

export const deleteRole = async (req, res, next) => {
    // if (req.user.key_r !== 1) {
    //     return next(new AppError(`Vous n'êtes pas autorisé à effectuer cette action.`, 403))
    // }

    const roles = await RoleModel.findByIdAndDelete(req.params.idRole)

    if (!roles || roles.length === 0 || roles === null || roles === undefined || roles === '') {
        return next(new AppError(`Aucun rôle ${req.params.idRole} trouvé.`, 404))
    }

    res.status(200).send({
        message: 'Rôle supprimé avec succès.'
    })
}
