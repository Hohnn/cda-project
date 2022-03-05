import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import request from 'supertest'
import routes from '../routes/routes.js'
import userModel from '../models/userModel'
import droneModel from '../models/droneModel'
import roleModel from '../models/roleModel'

dotenv.config()

const app = express()

app.use(cors())
app.options('*', cors());

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
	});
});

app.use("/api/v1", routes) 


describe('Test du serveur', () => {
	it("Code 200 OK", async () => {
		const response = await request(app).get('/')
		expect(response.status).toBe(200)
	})
})


describe('Test des routes', () => {
	const TU_User = {
		"email": 'jestemail',
		"password": 'jestPassword',
		"firstName_u": 'JestFirstName',
		"lastName_u": 'JestLastName',
        'company_u': 'JestCompany',
		'address_u': "address",
		'key_r': 99,
        'siret_u': 'JestSiret',
        'phone_u': '123456789'
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

	// it('Inscription depuis l\'interface utilisateur Signup', async () => {
	// 	const response = await request(app).post('/api/v1/signup')
	// 	.send(TU_User)
	// 	expect(response.statusCode).toBe(201)
	// 	expect(response.type).toEqual('application/json')	
	// })

	// it('Teste le login', async () => {
	// 	const response = await request(app).post('/api/v1/login')
	// 	.send({
	// 		email: TU_User.email,
	// 		password: TU_User.password
	// 	})
	// 	expect(response.status).toBe(200)
	// })

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


	const TU_Drone = {
		name_d: 'jestdrone',
		category_id: '62052a939b34400016aec79c',
		description_d: 'JestDescription',
		pricePerDay_d: 100,
		processState_id: '61fa80c3de01110590c87c5a'
	}

	// creation d'un drone avec la collection TU_Drone
	const TU_DroneId = async () => {
		const response = await request(app).post('/api/v1/drones')
		.send(TU_Drone)
		return response.body.drone._id
	}

	it('Affiche tous les drones', async () => {
		const response = await request(app).get('/api/v1/drones')
		expect(response.statusCode).toBe(200)
		expect(response.type).toEqual('application/json')
	})

	it('Créer un drone', async () => {
		const response = await request(app).post('/api/v1/drones')
		.send(TU_Drone)
		expect(response.statusCode).toBe(201)
		expect(response.type).toEqual('application/json')
	})

	it('Retourne un drone avec son id', async () => {
		const response = await request(app).get(`/api/v1/drones/${await TU_DroneId()}`)
		expect(response.statusCode).toBe(200)
		expect(response.type).toEqual('application/json')
	})

	it('Mise a jour d\'un drone', async () => {
		const response = await request(app).patch(`/api/v1/drones/${await TU_DroneId()}`)
		.send({
			pricePerDay_d: 200
		})
		expect(response.statusCode).toBe(200)
		expect(response.type).toEqual('application/json')
	})

	it('Supprime un drone', async () => {
		const response = await request(app).delete(`/api/v1/drones/${await TU_DroneId()}`)
		expect(response.statusCode).toBe(200)
		expect(response.type).toEqual('application/json')
		expect(response.text).toEqual(`{\"message\":\"Drone ${TU_Drone.name_d} supprimé.\"}`)
	})

	const TU_Role = {
		name_r: 'jestrole',
		description_r: 'jestdescription',
		key_r: 99
	}

	// creation d'un role avec la collection TU_Role
	const TU_RoleId = async () => {
		const response = await request(app).post('/api/v1/roles')
		.send(TU_Role)
		return response.body.roles._id
	}

	it('Affiche tous les roles', async () => {
		const response = await request(app).get('/api/v1/roles')
		expect(response.statusCode).toBe(200)
		expect(response.type).toEqual('application/json')
	})

	it('Créer un role', async () => {
		const response = await request(app).post('/api/v1/roles')
		.send(TU_Role)
		expect(response.statusCode).toBe(201)
		expect(response.type).toEqual('application/json')
	})

	it('Retourne un role avec son id', async () => {
		const response = await request(app).get(`/api/v1/roles/${await TU_RoleId()}`)
		expect(response.statusCode).toBe(200)
		expect(response.type).toEqual('application/json')
	})

	it('Mise a jour d\'un role', async () => {
		const response = await request(app).patch(`/api/v1/roles/${await TU_RoleId()}`)
		.send({
			name_r: 'NewJestRole'
		})
		expect(response.statusCode).toBe(200)
		expect(response.type).toEqual('application/json')
	})

	it('Supprime un role', async () => {
		const response = await request(app).delete(`/api/v1/roles/${await TU_RoleId()}`)
		expect(response.statusCode).toBe(200)
		expect(response.type).toEqual('application/json')
		expect(response.text).toEqual(`{\"message\":\"Rôle supprimé avec succès.\"}`)
	})


	afterAll(async () => {
		await userModel.deleteMany({email: TU_User.email});
		await droneModel.deleteMany({name_d: TU_Drone.name_d});
		await roleModel.deleteMany({key_r: TU_Role.key_r});
		await mongoose.disconnect()		
		await new Promise(resolve => setTimeout(() => resolve(), 500));
	});
});
