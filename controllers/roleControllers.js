import RoleModel from '../models/roleModel.js'

export const getRoles = async (_, res) => {
    const roles = await RoleModel.find({})
    res.send(roles)
}

export const getRole = async (req, res) => {
    const roles = await RoleModel.find({ _id: req.params.idRole })
    res.send(roles)
}

export const addRole = async (req, res) => {
    const role = new RoleModel(req.body)
    await role.save()
    res.send(role)
}

export const updateRole = async (req, res) => {
    const role = await RoleModel.findByIdAndUpdate(req.params.idRole, req.body)
    await role.save()
    res.send(role)
}

export const deleteRole = async (req, res) => {
  	const role = await RoleModel.findByIdAndDelete(req.params.idRole)
  	if (!role) {
		res.status(404).send('Aucun rôle trouvé.')
	}
	res.status(200).send()
}
