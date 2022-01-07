import CategoryModel from '../models/categoryModel.js'

export const getAllCategories = async (_, res) => {
  const categories = await CategoryModel.find({})
  res.send(categories)
}

export const getCategory = async (req, res) => {
  const category = await CategoryModel.find({ _id: req.params.id })
  res.send(category[0])
}

export const addCategory = async (req, res) => {
  const category = new CategoryModel(req.body)

  await category.save()
  res.send(category)
}

export const deleteCategory = async (req, res) => {
  const category = await CategoryModel.findByIdAndDelete(req.params.id)

  if (!category) res.status(404).send('Aucune chambre trouvée.')
  res.status(200).send()
}

export const updateCategory = async (req, res) => {
  const category = await CategoryModel.findByIdAndUpdate(req.params.id, req.body)
  await category.save()
  res.send(category)
}
