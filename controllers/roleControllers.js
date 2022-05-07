import RoleModel from '../models/roleModel.js'
import AppError from '../utils/AppError.js'

export const getRoles = async (_, res) => {
    const roles = await RoleModel.find({})
    if(!roles) {
       return next(new AppError(`Aucun rôle trouvé.`, 404))
    }
    res.send(roles)
}

export const getRole = async (req, res) => {
    const roles = await RoleModel.find({ _id: req.params.idRole })
    res.send(roles)
}

export const addRole = async (req, res) => {
    const roles = new RoleModel(req.body)
    await roles.save()
    if(!roles) {
        return next(new AppError(`Erreur lors de la création du rôle.`, 400))
    }
    res.status(201).send({
        message: 'Rôle créé avec succès',
        roles: roles
    })
}

export const updateRole = async (req, res) => {
    const roles = await RoleModel.findByIdAndUpdate(req.params.idRole, req.body)
    await roles.save()
    res.send( {message:'Rôle mis à jour avec succès', role: roles})
}

export const deleteRole = async (req, res) => {
  	const roles = await RoleModel.findByIdAndDelete(req.params.idRole)
  	if (!roles) {
		return next(new AppError(`Aucun rôle ${req.params.idRole} trouvé.`, 404))
    }
	res.status(204).send({ 
        message: 'Rôle supprimé avec succès.' 
    })
}
