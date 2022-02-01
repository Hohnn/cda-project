import CategoryModel from '../models/categoryModel.js'

export const getCategories = async (_, res) => {
  const categories = await RoleModel.find({})
  res.send(categories)
}

export const getCategory = async (req, res) => {
  const Categorys = await RoleModel.find({ _id: req.params.id })
  res.send(roles[0])
}

export const addRole = async (req, res) => {
  const role = new RoleModel(req.body)

  await role.save()
  res.send(role)
}

export const deleteRole = async (req, res) => {
  const role = await RoleModel.findByIdAndDelete(req.params.id)

  if (!role) res.status(404).send('Aucune chambre trouvée.')
  res.status(200).send()
}

export const updateRole = async (req, res) => {
  const role = await RoleModel.findByIdAndUpdate(req.params.id, req.body)
  await role.save()
  res.send(role)
}
