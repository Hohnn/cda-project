import userModel from '../models/userModel.js'


export const getUsers = async (_, res) => {
	const users = await userModel.find({})
	res.send(users)
  }

export const getUser = async (req, res) => {
	const users = await userModel.find({ _id: req.params.idUser })
	res.send(users[0])
}


export const addUser = async (req, res) => {
	const user = new userModel(req.body)
	await user.save()
	res.send(user)
}

export const updateUser = async (req, res) => {
  	const user = await userModel.findByIdAndUpdate(req.params.idUser, req.body)
  	await user.save()
  	res.send(user)
}

export const deleteUser = async (req, res) => {
	const user = await userModel.findByIdAndDelete(req.params.idUser)
	if (!user) {
    res.status(404).send('Aucun utilisateur trouvé.')
	}
	res.status(200).send()
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
