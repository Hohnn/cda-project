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
app.use("/api/v1", routes) 

describe('Connexion à la base de donnée', () => {

	it('Se connecte a l\'API SkyDrone sur MongoDB Atlas', async () => {
		const db = mongoose.connection
		expect(db.name).toBe('cdaproject')
	})

	it('Test de la route "/"', async () => {
		const response = await request(app).get('/')
		expect(response.status).toBe(200)
		expect(response.body).toEqual({message: "Welcome to SkyDrone API."})
	})
})


describe('Test des routes User', () => {
	const TU_User = {
		email: 'jestemail',
		password: 'jestPassword',
		firstName_u: 'JestFirstName',
		lastName_u: 'JestLastName',
        company_u: 'JestCompany',
        siret_u: 'JestSiret',
		key_u: 99,
        address_u: 'JestAddress',
        phone_u: '123456789',
        role_id:'61d859366d4d8a47389c6cab',
        createBy_id:'621e27c558ff070023646f63',
        createAt_u:'2022-03-03T12:15:44.327Z',
        updateBy_id:'621e27c558ff070023646f63',
        updateAt_u:'2022-03-03T12:15:44.327Z'
    }


	// creation d'un utilisateur avec la collection TU_User
	const TU_UserId = async () => {
		const response = await request(app).post('/api/v1/users')
		.send(TU_User)
		return response.body._id
	}

	it('Affiche tous les utilisateurs', async () => {
		const response = await request(app).get('/api/v1/users')
		expect(response.statusCode).toBe(200)
		expect(response.type).toEqual('application/json')
	})

	it('Créer un utilisateur', async () => {
		const response = await request(app).post('/api/v1/users')
		.send(TU_User)
		expect(response.statusCode).toBe(201)
		expect(response.type).toEqual('application/json')
	})

	it('Retourne un utilisateurs avec son id', async () => {
		const response = await request(app).get(`/api/v1/users/${await TU_UserId()}`)
		expect(response.statusCode).toBe(200)
		expect(response.type).toEqual('application/json')
	})

	it('Mise a jour d\'un utilisateur', async () => {
		const response = await request(app).patch(`/api/v1/users/${await TU_UserId()}`)
		.send({
			firstName_u: 'NewJestFirstName',
			lastName_u: 'NewJestLastName'
		})
		expect(response.statusCode).toBe(200)
		expect(response.type).toEqual('application/json')
	})

	it('Supprime un utilisateur', async () => {
		const response = await request(app).delete(`/api/v1/users/${await TU_UserId()}`)
		expect(response.statusCode).toBe(200)
		expect(response.type).toEqual('application/json')
		expect(response.text).toEqual("{\"message\":\"Utilisateur supprimé.\"}")
	})

	afterAll(() => userModel.deleteMany({ email: 'jestemail' }))
})