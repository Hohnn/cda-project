import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import request from 'supertest'
import routes from '../routes/routes.js'
import userModel from '../models/userModel'

dotenv.config()

const PORT = process.env.PORT || 5001
const app = express()

app.use(cors())
app.options('*', cors());

app.use(express.json())

beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    })
})

app.get("/", (_, res) => {res.send({message: "Welcome to SkyDrone API."})});
app.use('api/v1', routes) 

it('Se connecte a l\'API SkyDrone sur MongoDB Atlas', async () => {
    const db = mongoose.connection
    expect(db.name).toBe('cdaproject')
})

it('Test de la route "/"', async () => {
    const response = await request(app).get('/')
    expect(response.status).toBe(200)
    expect(response.body).toEqual({message: "Welcome to SkyDrone API."})
})

describe('Test des routes User', () => {
	const TU_User = {
		email: 'Jestemail',
		password: 'jestPassword',
		firstName_u: 'JestFirstName',
		lastName_u: 'JestLastName',
        company_u: 'JestCompany',
        siret_u: 'JestSiret',
        address_u: 'JestAddress',
        phone_u: '123456789',
        role_id:'621e27c558ff070023646f63',
        createBy_id:'',
        createAt_u:'2022-03-03T12:15:44.327Z',
        updateBy_id:'',
        updateAt_u:'2022-03-03T12:15:44.327Z'
    }


	// creation d'un utilisateur avec la collection TU_User
	const getUserId = async () => {
		const response = await request(app).post('/api/v1/users')
		.send(TU_User)
		return response.body._id
	}

	it('should return all users', async () => {
		const response = await request(app).get('/api/v1/users')
		expect(response.statusCode).toBe(200)
		expect(response.type).toEqual('application/json')
	})

	it('should create an user', async () => {
		const response = await request(app).post('/api/v1/users')
		.send(TU_User)
		expect(response.statusCode).toBe(200)
		expect(response.type).toEqual('application/json')
	})

	it('should return an user', async () => {
		const response = await request(app).get(`/api/v1/users/${await getUserId()}`)
		expect(response.statusCode).toBe(200)
		expect(response.type).toEqual('application/json')
	})

	it('should update an user', async () => {
		const response = await request(app).patch(`/api/v1/users/${await getUserId()}`)
		.send({
			first_name: 'SuperTest',
			last_name: 'Jest'
		})
		expect(response.statusCode).toBe(200)
		expect(response.type).toEqual('application/json')
	})

	it('should delete an user', async () => {
		const response = await request(app).delete(`/api/v1/users/${await getUserId()}`)
		expect(response.statusCode).toBe(200)
		expect(response.text).toEqual('User deleted')
	})

	afterAll(() => userModel.deleteMany({ role: 'test' }))
})