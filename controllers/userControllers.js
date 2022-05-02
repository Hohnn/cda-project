import userModel from '../models/userModel.js'
import UserModel from '../models/userModel.js'
import AppError from '../utils/AppError.js'

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


export const addUser = async (req, res, next) => {
	const user = new userModel(req.body)
	await user.save()
    if(!user || user === null || user === undefined || user === '') {
        return next(new AppError(`Erreur lors de la création de l'utilisateur.`, 400))
    }
        res.status(201).send(user)
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
	res.status(204).send({ message: `Utilisateur ${req.params.idUser} supprimé.` })
}

export const getUserById = async (req, res, next, id) => {
  await userModel
    .findById(req.params.idUser)
    .populate('role_id')
    .populate('createBy_id')
    .populate('updateBy_id')
    .exec((err, user) => {
        console.log(user)
        if(err || !user){
            return res.status(400).json({
                error: "User not found"
            });
        }
        console.log('The author is %s', user.role_id.key_r);
        // on ajoute l'objet profile contenant les infos de l'utilisateur dans la requête
        req.profile = user;
        next();
    });
};