import CategoryModel from '../models/categoryModel.js'

export const addCategory = async (req, res) => {
	const category = new CategoryModel(req.body)
  
	await category.save()
	res.send(category)
}

export const getAllCategories = async (_, res) => {
	const categories = await CategoryModel.find({})
	res.send(categories)
}

export const getCategory = async (req, res) => {
  	const category = await CategoryModel.find({ _id: req.params.idCategory })
  	res.send(category)
}

export const updateCategory = async (req, res) => {
  	const category = await CategoryModel.findByIdAndUpdate(req.params.idCategory, req.body)
  	await category.save()
  	res.send(category)
}

export const deleteCategory = async (req, res) => {
	const category = await CategoryModel.findByIdAndDelete(req.params.idCategory)
	if (!category) {
		res.status(404).send('Aucune catégorie trouvée.')
	}
	res.status(200).send('Drone supprimé avec succès')
}

export const getCategoryById = async (req, res, next, id) => {
    await CategoryModel
      .findById(req.params.idCategory)
      .exec((err, category) => {
          console.log(category)
          if(err || !category){
              return res.status(400).json({
                  error: "User not found"
              });
          }
		  console.log(category);
          // on ajoute l'objet profile contenant les infos de l'utilisateur dans la requête
          req.categoryProfile = category;
          next();
      });
  };