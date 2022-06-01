import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import request from 'supertest'
import routes from '../routes/routes.js'
import passport from '../auth/auth.js'
import UserModel from '../models/userModel.js'
import DroneModel from '../models/droneModel.js'
import OrderModel from '../models/orderModel.js'

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


	it('Inscription d\'utilisateur avec mauvais password : POST api/v1/signup', async () => {
		request(app)
			.post('/api/v1/signup', auth.jwt)
			.send({
				"email": "testeur",
				"password": "123456",
				"lastName_u": "POSTMAN",
				"firstName_u": "test",
				"company_u": "SKYDRONE",
				"phone_u": "0235102030",
				"address_u": "10 Place Léon Meyer",
				"siret_u": "123456"
			})
			.expect(400)
	})

	it('Se connecte au site', async () => {
		request(app)
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

	it('Peux consulter les commandes : GET /api/v1/orders', async () => {
		await request(app)
			.get('/api/v1/orders', auth.jwt)
			.expect(401)
	})

	const TU_Drone = {
		"name_d": "DRONETEST",
		"category_id": "62798a4aeefdb95f65512719",
		"description_d": "DRONETEST",
		"pricePerDay_d": 100
	}
	const TU_DroneId = async () => {
		const response = await request(app)
			.post('/api/v1/drones', auth.jwt)
			.send(TU_Drone)
		return response.body._id
	}

	const TU_Order = {
		"state_o": "En attente",
		"user_id": TU_UserId(),
		"drone_id": TU_DroneId(),
		"startAt_o": "2022-04-08T00:00:00.000Z",
		"endAt_o": "2022-04-18T00:00:00.000Z",
		"createdBy_o": TU_UserId(),
		"report_o": "TESTJEST"
	}

	it('Peux créer une commande : POST /api/v1/orders', async () => {
		const response = await request(app)
			.post('/api/v1/orders', auth.jwt)
			.set({ TOKEN })
			.send(TU_Order)
			console.log(TU_Order)
			.expect(201)
	})

	afterAll(async () => {
		await UserModel.deleteMany({ email: TU_User.email })
		await DroneModel.deleteMany({ name_d: TU_Drone.name_d })
		await OrderModel.deleteMany({ report_o: TU_Order.report_o })
		await mongoose.disconnect()
		await new Promise(resolve => setTimeout(() => resolve(), 500))
	})
})
