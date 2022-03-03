import userModel from '../models/userModel.js'

export const getUsers = async (req, res) => {
	const users = await userModel.find({})
	if(!users) {
        res.status(402).send({ message: 'Aucun utilisateur trouvé.'})
    }
    res.send(users)
  }

export const getUser = async (req, res) => {
	const user = await userModel.findById(req.params.idUser)
    .populate('role_id')
    .exec((err, user) => {
    if(!user || user === null || user === undefined || user === '') {
        res.status(404).send({ 
            message: `Aucun utilisateur ${req.params.idUser} trouvé.`
        })
        return
    }
    if(err) {
        res.status(400).send({
            message: 'Erreur lors de la récupération du user',
            error: err
        })
        return
    }
    res.send({
            message: `Utilisateur ${req.params.idUser} trouvé`,
            user: user
        })
    })
}


export const addUser = async (req, res) => {
	const user = new userModel(req.body)
    // if(user.email) {
    //     const userExist = await userModel.findOne({email: user.email})
    //     if(userExist) {
    //         res.status(400).send({
    //             message: 'Email déjà existant.'
    //         })
    //         return
    //     }
    // }
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

export const updateUser = async (req, res) => {
  	const user = await userModel.findByIdAndUpdate(req.params.idUser, req.body)
      if(!user) {
          res.status(404).send({ 
              message: `Aucun utilisateur ${req.params.idUser} trouvé.`
            })
            return
        }
    await user.save()
    res.status(200).send(user)    
}

export const deleteUser = async (req, res) => {
	const user = await userModel.findByIdAndDelete(req.params.idUser)
	if (!user) {
    res.status(400).send({ message: 'Aucun utilisateur trouvé.' })
	}
	res.status(200).send({ message: 'Utilisateur supprimé.' })
}

export const logout = (req, res) => {
    req.logout();
    res.redirect('/');
    }
    

