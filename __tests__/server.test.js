import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import request from 'supertest'
import routes from '../routes/routes4tests.js'
import UserModel from '../models/userModel'

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
		const response = await request(app).get('/')
		expect(response.status).toBe(200)
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
		"phone_u": "0235102030",
		"address_u": "10 Place Léon Meyer",
		"siret_u": "123456"
	}

	it('Inscription d\'un utilisateur : POST api/v1/signup', async () => {
		const response = await request(app).post('/api/v1/signup')
			.send(TU_User)
		expect(response.status).toBe(404)
	})

	it('Inscription d\'utilisateur avec mauvais password : POST api/v1/signup', async () => {
		const response = await request(app).post('/api/v1/signup').send({
			"email": "testeur",
			"password": "123456",
			"lastName_u": "POSTMAN",
			"firstName_u": "test",
			"company_u": "SKYDRONE",
			"phone_u": "0235102030",
			"address_u": "10 Place Léon Meyer",
			"siret_u": "123456"
		})
		expect(response.status).toBe(404)
	})

	it('Se connecte au site', async () => {
		const response = await request(app).post('/api/v1/login')
			.send({
				"email": TU_User.email,
				"password": TU_User.password
			})

		expect(response.status).toBe(404)
	})

	it('Peux parcourir les drones : GET /api/v1/drones', async () => {
		const response = await request(app).get('/api/v1/drones')
		expect(response.statusCode).toBe(200)
		expect(response.type).toEqual('application/json')
	})

	it('Peux parcourir les categories de drones : GET /api/v1/categories', async () => {
		const response = await request(app).get('/api/v1/categories')
		expect(response.statusCode).toBe(200)
		expect(response.type).toEqual('application/json')
	})

	afterAll(async () => {
		await UserModel.deleteMany({ email: TU_User.email })
		await mongoose.disconnect()
		await new Promise(resolve => setTimeout(() => resolve(), 500))
	})
})
