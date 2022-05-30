import userModel from '../models/userModel.js'
import AppError from '../utils/AppError.js'

export const getUsers = async (req, res, next) => {
    if (req.user.key_r > 2) {
        return next(new AppError(`Vous n'etes pas autorisé à effectuer cette action.`, 403))
    }
    const users = await userModel.find({})

    if (!users || users === null || users === undefined || users === '') {
        return next(new AppError(`Aucun utilisateur trouvé.`, 404))
    }
    res.send(users)
}

export const getUser = async (req, res, next) => {
    if (req.user.key_r > 2) {
        return next(new AppError(`Vous n'etes pas autorisé à effectuer cette action.`, 403))
    }
    const user = await userModel.findById(req.params.idUser)

        .populate('role_id')
        .exec((err, user) => {
            if (!user || user === null || user === undefined || user === '') {
                return next(new AppError(`Aucun utilisateur ${req.params.idUser} trouvé.`, 404))

            }
            res.send({
                message: `Utilisateur ${req.params.idUser} trouvé`,
                user: user
            })
        })
}


export const addUser = async (req, res, next) => {
    if (req.user.key_r > 1) {
        return next(new AppError(`Vous n'etes pas autorisé à effectuer cette action.`, 403))
    }
    const email = req.body.email
    const user = new userModel(req.body)
    const userExist = await userModel.findOne({ email })

    if (!user || user === null || user === undefined || user === '') {
        return next(new AppError(`Erreur lors de la création de l'utilisateur.`, 400))
    }
    if (userExist) {
        return next(new AppError(`Adresse ${userExist.email} deja utilisée.`, 400))
    }
    await user.save()
    res.status(201).send(user)
}


export const updateUser = async (req, res, next) => {
    if (req.user.key_r > 2 || req.user.key_r === 3 && req.user._id !== user._id) {
        return next(new AppError(`Vous n'etes pas autorisé à effectuer cette action.`, 403))
    }
    const user = await userModel.findByIdAndUpdate(req.params.idUser, req.body)
    if (!user || user === null || user === undefined || user === '') {
        return next(new AppError(`Aucun utilisateur ${req.params.idUser} trouvé.`, 404))
    }
    await user.save()
    res.status(200).send({
        message: 'Utilisateur modifié',
        user: user
    })
}

export const deleteUser = async (req, res, next) => {
    if (req.user.key_r > 2) {
        return next(new AppError(`Vous n'etes pas autorisé à effectuer cette action.`, 403))
    }
    const user = await userModel.findByIdAndDelete(req.params.idUser)
    if (!user || user === null || user === undefined || user === '') {
        return next(new AppError(`Aucun utilisateur ${req.params.idUser} trouvé.`, 404))
    }
    res.status(200).send({
        message: `Utilisateur ${user._id} supprimé.`
    })
}

export const getUserById = async (req, res, next) => {
    if (req.user.key_r > 2) {
        return next(new AppError(`Vous n'etes pas autorisé à effectuer cette action.`, 403))
    }
    await userModel
        .findById(req.params.idUser)
        .populate('role_id')
        .populate('createBy_id')
        .populate('updateBy_id')
        .exec((err, user) => {
            if (err || !user) {
                return next(new AppError(`Aucun utilisateur ${req.params.idUser} trouvé.`, 404))
            }
        })

    // on ajoute l'objet profil contenant les infos de l'utilisateur dans la requête
    req.profil = user
    res.status(200).send({
        message: `Utilisateur ${req.params.idUser} trouvé`,
        user: user
    })
}
