import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import request from 'supertest'
import routes from '../routes/routes.js'
import passport from '../auth/auth.js'
import UserModel from '../models/userModel.js'

const auth = {
	signup: passport.authenticate('signup', { session: false }),
	jwt: passport.authenticate('jwt', { session: false })
}

dotenv.config()

const TOKEN = process.env.TOKEN
const app = express()

app.use(cors())
app.options({
	origin: '*',
	options: 'GET,POST,PATCH,DELETE',
	allowedHeaders: 'Content-type,token'
})

app.use(express.json())

mongoose.connect(process.env.MONGODB, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: false
})

app.get("/", (req, res, next) => {
	res.send({
		message: "Welcome to SkyDrone API."
	})
})

app.use("/api/v1", routes)

describe('Test du serveur', () => {
	it("Code 200 OK", async () => {
		await request(app)
			.get('/')
			.expect(200)
	})
})

describe('Test des routes', () => {

	//#region User
	const TU_User = {
		"email": "testeur",
		"password": "password",
		"lastName_u": "POSTMAN",
		"firstName_u": "test",
		"company_u": "SKYDRONE",
		"key_r": 0,
		"phone_u": "0235102030",
		"address_u": "10 Place Léon Meyer",
		"zipCode_u": 76600,
		"country_u": "France",
		"siret_u": "123456"
	}

	const TU_UserId = async () => {
		const response = await request(app)
			.post('/api/v1/users')
			.set({ TOKEN })
			.send(TU_User)
		return response.body._id
	}


	it('Inscription d\'un utilisateur : POST api/v1/signup', async () => {
		await request(app)
			.post('/api/v1/signup', auth.signup)
			.send(TU_User)
			.expect(201)
	})


	it('Inscription d\'utilisateur avec password non conforme : POST api/v1/signup', async () => {
		request(app)
			.post('/api/v1/signup')
			.send({
				"email": "testeur",
				"password": "123456",
				"lastName_u": "POSTMAN",
				"firstName_u": "test",
				"company_u": "SKYDRONE",
				"phone_u": "0235102030",
				"address_u": "10 Place Léon Meyer",
				"zipCode_u": 76600,
				"country_u": "France",
				"siret_u": "123456"
			})
			.expect(400)
	})

	it('Se connecte au site', async () => {
		const response = await request(app)
			.post('/api/v1/login', auth.jwt)
			.send({
				"email": TU_User.email,
				"password": TU_User.password
			})
			.expect(200)
	})

	it('Peux parcourir les drones : GET /api/v1/drones', async () => {
		await request(app)
			.get('/api/v1/drones')
			.expect(200)
	})

	it('Peux parcourir les categories de drones : GET /api/v1/categories', async () => {
		await request(app)
			.get('/api/v1/categories')
			.expect(200)
	})

	it('Ne peux pas consulter les commandes sans etre authentifié : GET /api/v1/orders', async () => {
		await request(app)
			.get('/api/v1/orders')
			.expect(401)
	})

	it('Ne peux pas consulter les users sans etre authentifié : GET /api/v1/users', async () => {
		await request(app)
			.get('/api/v1/users')
			.expect(401)
	})

	// it('Peux consulter les users avec le token : GET /api/v1/users', async () => {
	// 	await request(app)
	// 		.get('/api/v1/users')
	// 		.set({ TOKEN })
	// 		.expect(200)
	// })

	// it('Peux consulter l\'id d\'un user avec le token : GET /api/v1/users/:idUser', async () => {
	// 	await request(app)
	// 		.get('/api/v1/users/:idUser')
	// 		.set({ TOKEN })
	// 		.expect(200)
	// })

	// it('Peux consulter les oders avec le token : GET /api/v1/orders', async () => {
	// 	await request(app)
	// 		.get('/api/v1/orders')
	// 		.set({ TOKEN })
	// 		.expect(200)
	// })


	afterAll(async () => {
		await UserModel.deleteMany({ email: TU_User.email })
		await mongoose.disconnect()
		await new Promise(resolve => setTimeout(() => resolve(), 500))
	})
})
