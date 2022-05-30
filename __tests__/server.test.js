import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import request from 'supertest'
import routes4tests from '../routes/routes4tests.js'
import QrCodeModel from '../models/qrCodeModel'
import DroneModel from '../models/droneModel'
import UserModel from '../models/userModel'
import CategoryModel from '../models/categoryModel.js'

dotenv.config()

const app = express()

app.use(cors())
app.options('*', cors())

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

mongoose.connect(process.env.MONGODB, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true
})
app.use("/api/v1", routes4tests)

app.get("/", (req, res, next) => {
	res.send({
		message: "Welcome to SkyDrone API."
	})
})



describe('Test du serveur', () => {
	it("Code 200 OK", async () => {
		const response = await request(app).get('/')
		expect(response.status).toBe(200)
	})
})

describe('Test des routes', () => {

	//#region User
	const TU_User = {
		"email": "test@skydrone.fr",
		"password": "password",
		"firstName_u": "firstname",
		"lastName_u": "lastname",
		"company_u": "companyU",
		"phone_u": "phone",
		"address_u": "address",
		"key_r": 1,
		"siret_u": "siret"
	}

	const TU_UserId = async () => {
		const response = await request(app).post('/api/v1/users')
			.send(TU_User)
		return response.body._id
	}


	it('GET /api/v1/users', async () => {
		const response = await request(app).get('/api/v1/users')
		expect(response.statusCode).toBe(200)
		expect(response.type).toEqual('application/json')
	})

	it('PATCH /api/v1/users/:idUser', async () => {
		const response = await request(app).patch(`/api/v1/users/${await TU_UserId()}`)
			.send({
				firstName_u: 'NewJestFirstName',
				lastName_u: 'NewJestLastName'
			})
		expect(response.statusCode).toBe(200)
		expect(response.type).toEqual('application/json')
	})
	//#endregion

	//#region QrCode

	const TU_QR = {
		src: 'http://localhost:3000/'
	}
	const TU_QrCodeId = async () => {
		const response = await request(app).post('/api/v1/qrcodes')
			.send(TU_QR)
		return response.body.qrCode._id
	}

	it('GET /api/v1/qrcodes', async () => {
		const response = await request(app).get('/api/v1/qrcodes')
		expect(response.statusCode).toBe(200)
		expect(response.type).toEqual('application/json')
	})

	it('GET /api/v1/qrcodes/:idQrCode', async () => {
		const response = await request(app).get(`/api/v1/qrcodes/${await TU_QrCodeId()}`)
		expect(response.statusCode).toBe(200)
		expect(response.type).toEqual('application/json')
	})

	//#endregion

	//#region Category

	const TU_Category = {
		name_cat: 'Testeur',
		description_cat: 'Testeur',
		max_weight: 999,
		max_altitude: 9999,
		fly_type: "Testeur",
		key: 99
	}

	const TU_CategoryId = async () => {
		const response = await request(app).post('/api/v1/categories')
			.send(TU_Category)
		return response.body.category._id
	}


	it('GET /api/v1/categories', async () => {
		const response = await request(app).get('/api/v1/categories')
		expect(response.statusCode).toBe(200)
		expect(response.type).toEqual('application/json')
	})

	//#endregion

	//#region Drone

	

	it('GET /api/v1/drones', async () => {
		const response = await request(app).get('/api/v1/drones')
		expect(response.statusCode).toBe(200)
		expect(response.type).toEqual('application/json')
	})

	//#endregion

	//#region Role
	const TU_Role = {
		name_r: 'Testeur',
		key_r: 0
	}

	const TU_RoleId = async () => {
		const response = await request(app).post('/api/v1/roles')
			.send(TU_Role)
		return response.body.roles._id
	}

	it('GET /api/v1/roles', async () => {
		const response = await request(app).get('/api/v1/roles')
		expect(response.statusCode).toBe(200)
		expect(response.type).toEqual('application/json')
	})

	it('GET /api/v1/roles/:roleID', async () => {
		const response = await request(app).get(`/api/v1/roles/${await TU_RoleId()}`)
		expect(response.statusCode).toBe(200)
		expect(response.type).toEqual('application/json')
	})

	//#endregion

	//#region Order



	it('GET /api/v1/orders', async () => {
		const response = await request(app).get('/api/v1/orders')
		expect(response.statusCode).toBe(401)
		expect(response.type).toEqual('application/json')
	})

	//#endregion



	afterAll(async () => {
		await QrCodeModel.deleteMany({ src: TU_QR.src })
		await UserModel.deleteMany({ email: TU_User.email })
		await CategoryModel.deleteMany({ name_cat: TU_Order.name_cat })
		await DroneModel.deleteMany({ name_d: TU_Drone.name_d })
		await RoleModel.deleteMany({ name_r: TU_Role.name_r })
		await mongoose.disconnect()
		await new Promise(resolve => setTimeout(() => resolve(), 500))
	})
})
