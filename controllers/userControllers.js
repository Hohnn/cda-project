import userModel from '../models/userModel.js'
import AppError from '../utils/AppError.js'

export const getUsers = async (_, res, next) => {
    const users = await userModel.find({})
    if (!users || users === null || users === undefined || users === '') {
        return next(new AppError(`Aucun utilisateur trouvé.`, 404))
    }
    res.send(users)
}

export const getUser = async (req, res, next) => {
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
    const user = await userModel.findByIdAndDelete(req.params.idUser)
    if (!user || user === null || user === undefined || user === '') {
        return next(new AppError(`Aucun utilisateur ${req.params.idUser} trouvé.`, 404))
    }
    res.status(204).send({
        message: `Utilisateur ${user.firstname} ${user.lastname} ${user._id} supprimé.`
    })
}

export const getUserById = async (req, res, next) => {
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
    // console.log('The author is %s', user.role_id.key_r)
    // on ajoute l'objet profile contenant les infos de l'utilisateur dans la requête
    req.profile = user
    res.status(200).send({
        message: `Utilisateur ${req.params.idUser} trouvé`,
        user: user
    })
}
