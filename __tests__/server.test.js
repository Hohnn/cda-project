import express from 'express'
import mongoose from 'mongoose'
import bodyparser from 'body-parser'
import dotenv from 'dotenv'
import cors from 'cors'
import request from 'supertest'
import routes4tests from '../routes/routes4tests.js'
import QrCodeModel from '../models/qrCodeModel'
import DroneModel from '../models/droneModel'
import UserModel from '../models/userModel'
import OrderModel from '../models/orderModel'
import RoleModel from '../models/roleModel'
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

app.get("/", (req, res) => {
	res.send({
		message: "Welcome to SkyDrone API."
	})
})

app.use("/api/v1", routes4tests)


describe('Test du serveur', () => {
	it("Code 200 OK", async () => {
		const response = await request(app).get('/')
		expect(response.status).toBe(200)
	})
})

describe('Test des routes', () => {

	//#region User
	const TU_User = {
		email: 'jestemail',
		password: 'jestPassword',
		firstName_u: 'JestFirstName',
		lastName_u: 'JestLastName',
		company_u: 'JestCompany',
		address_u: 'Jestaddress',
		key_r: 99,
		siret_u: 'JestSiret',
		phone_u: '123456789'
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
		console.log(response.body)
		return response.body.category._id
	}


	it('GET /api/v1/categories', async () => {
		const response = await request(app).get('/api/v1/categories')
		expect(response.statusCode).toBe(200)
		expect(response.type).toEqual('application/json')
	})

	//#endregion

	//#region Drone

	const TU_Drone = {
		name_d: 'jestdrone',
		category_id: '62798a4aeefdb95f65512719',
		description_d: 'JestDescription',
		pricePerDay_d: 100
	}

	const TU_DroneId = async () => {
		const response = await request(app).post('/api/v1/drones')
			.send(TU_Drone)
		return response.body.drone._id
	}

	it('GET /api/v1/drones', async () => {
		const response = await request(app).get('/api/v1/drones')
		expect(response.statusCode).toBe(200)
		expect(response.type).toEqual('application/json')
	})

	it('GET /api/v1/drones/:idDrone', async () => {
		const response = await request(app).get(`/api/v1/drones/${await TU_DroneId()}`)
		expect(response.statusCode).toBe(200)
		expect(response.type).toEqual('application/json')
	})

	it('PATCH /api/v1/drones/:idDrone', async () => {
		const response = await request(app).patch(`/api/v1/drones/${await TU_DroneId()}`)
			.send({
				pricePerDay_d: 100
			})
		expect(response.statusCode).toBe(200)
		expect(response.type).toEqual('application/json')
	})

	it('DELETE /api/v1/drones/:idDrone', async () => {
		const response = await request(app).delete(`/api/v1/drones/${await TU_DroneId()}`)
		expect(response.statusCode).toBe(204)
	})


	//#endregion

	//#region Role
	const TU_Role = {
		name_r: 'Testeur',
		key_r: 99
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

	const TU_Order = {
		state_o: 'En attente',
		user_id: '6227dd48caa0062c1cce614f',
		drone_id: '624ad9b97bc6f50023b4126f',
		startAt_o: '2022-04-08T00:00:00.000Z',
		endAt_o: '2022-04-18T00:00:00.000Z',
		createdBy_o: '6274f721ace750e57c863702',
		report_o: 'string'
	}

	const TU_OrderId = async () => {
		const response = await request(app).post('/api/v1/orders')
			.send(TU_Order)
		return response.body.order._id
	}


	it('GET /api/v1/orders', async () => {
		const response = await request(app).get('/api/v1/orders')
		expect(response.statusCode).toBe(200)
		expect(response.type).toEqual('application/json')
	})

	it('GET /api/v1/orders/:idOrder', async () => {
		const response = await request(app).get(`/api/v1/orders/${await TU_OrderId()}`)
		expect(response.statusCode).toBe(200)
		expect(response.type).toEqual('application/json')
	})

	it('GET /api/v1/orders/user/:idUser', async () => {
		const response = await request(app).get(`/api/v1/orders/user/6227dd48caa0062c1cce614f`)
		expect(response.statusCode).toBe(200)
		expect(response.type).toEqual('application/json')
	})

	//#endregion



	afterAll(async () => {
		await QrCodeModel.deleteMany({ src: TU_QR.src })
		await UserModel.deleteMany({ email: TU_User.email })
		await OrderModel.deleteMany({ createdBy_o: TU_Order.createdBy_o })
		await CategoryModel.deleteMany({ name_cat: TU_Order.name_cat })
		await DroneModel.deleteMany({ name_d: TU_Drone.name_d })
		await RoleModel.deleteMany({ name_r: TU_Role.name_r })
		await mongoose.disconnect()
		await new Promise(resolve => setTimeout(() => resolve(), 500))
	})
})
