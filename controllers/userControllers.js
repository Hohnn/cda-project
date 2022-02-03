import userModel from '../models/userModel.js'


export const getUsers = async (_, res) => {
  const users = await userModel.find({})
  res.send(users)
}

export const getUser = async (req, res) => {
  const users = await userModel.findById({ _id: req.params.id })
  res.send(users)
}


export const addUser = async (req, res) => {
  const user = new userModel(req.body)

  await user.save()
  res.send(user)
}

export const deleteUser = async (req, res) => {
  const user = await userModel.findByIdAndDelete(req.params.id)

  if (!user) res.status(404).send('Aucune utilisateur trouvée.')
  res.status(200).send()
}

export const updateUser = async (req, res) => {
  const user = await userModel.findByIdAndUpdate(req.params.id, req.body)
  await user.save()
  res.send(user)
}
