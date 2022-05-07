import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import request from 'supertest'
import routes from '../routes/routes.js'
import QrCodeModel from '../models/qrCodeModel'


dotenv.config()

const app = express()

app.use(cors())
app.options('*', cors())

app.use(express.json())

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

app.use("/api/v1", routes)


describe('Test du serveur', () => {
	it("Code 200 OK", async () => {
		const response = await request(app).get('/')
		expect(response.status).toBe(200)
	})
})

describe('Test des routes non protégées', () => {

	it('Affiche tous les drones', async () => {
		const response = await request(app).get('/api/v1/drones')
		expect(response.statusCode).toBe(200)
		expect(response.type).toEqual('application/json')
	})

	it('Affiche toutes les categories', async () => {
		const response = await request(app).get('/api/v1/categories')
		expect(response.statusCode).toBe(200)
		expect(response.type).toEqual('application/json')
	})

	const TU_QR = {
		src: 'http://localhost:3000/'
	}

	it('Affiche tous les QR Codes', async () => {
		const response = await request(app).get('/api/v1/qrcodes')
		expect(response.statusCode).toBe(200)
		expect(response.type).toEqual('application/json')
	})

	it('crée un QR', async () => {
		const response = await request(app).post('/api/v1/qrcodes').send(TU_QR)
		expect(response.statusCode).toBe(201)
		expect(response.type).toEqual('application/json')
	})

	afterAll(async () => {
		await QrCodeModel.deleteMany({ src: TU_QR.src })
		await mongoose.disconnect()
		await new Promise(resolve => setTimeout(() => resolve(), 500))
	})
})
