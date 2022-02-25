import RoleModel from '../models/roleModel.js'

export const getRoles = async (_, res) => {
    const roles = await RoleModel.find({})
    if(!roles) {
        res.status(404).send({ message: 'Aucun rôle trouvé.'})
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
    res.send(roles)
}

export const updateRole = async (req, res) => {
    const roles = await RoleModel.findByIdAndUpdate(req.params.idRole, req.body)
    await roles.save()
    res.send( {message:'Rôle mis à jour avec succès', role: roles})
}

export const deleteRole = async (req, res) => {
  	const roles = await RoleModel.findByIdAndDelete(req.params.idRole)
  	if (!roles) {
		res.status(400).send({ message: 'Aucun rôle trouvé.'})
	}
	res.send({ message: 'Rôle supprimé avec succès.' })
}
