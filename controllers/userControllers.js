import userModel from '../models/userModel.js'
import AppError from '../utils/appError.js'

export const getUsers = async (req, res, next) => {
	const users = await userModel.find({})
	if(!users || users === null || users === undefined || users === '') {
        return next(new AppError(`Aucun utilisateur trouvé.`, 404))
        
    }
    res.send(users)
  }

export const getUser = async (req, res, next) => {
	const user = await userModel.findById(req.params.idUser)
    .populate('role_id')
    .exec((err, user) => {
    if(!user || user === null || user === undefined || user === '') {
        return next(new AppError(`Aucun utilisateur ${req.params.idUser} trouvé.`, 404))
        
    }
    res.send({
            message: `Utilisateur ${req.params.idUser} trouvé`,
            user: user
        })
    })
}


export const addUser = async (req, res) => {
	const user = new userModel(req.body)
	await user.save()
    .then(() => {
        res.status(201).send(user)
    })
    .catch(err => {
        res.status(400).send({
            message: 'Erreur lors de la création de l\'utilisateur',
            error: err
        })
    })
}

export const updateUser = async (req, res, next) => {
  	const user = await userModel.findByIdAndUpdate(req.params.idUser, req.body)
      if(!user || user === null || user === undefined || user === '') {
        return next(new AppError(`Aucun utilisateur ${req.params.idUser} trouvé.`, 404))
    }

    await user.save()
    res.status(200).send(user)    
}

export const deleteUser = async (req, res, next) => {
	const user = await userModel.findByIdAndDelete(req.params.idUser)
	if(!user || user === null || user === undefined || user === '') {
        return next(new AppError(`Aucun utilisateur ${req.params.idUser} trouvé.`, 404))
        
    }
	res.status(204).send({ message: 'Utilisateur supprimé.' })
}