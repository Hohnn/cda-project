import swaggerAutogen from 'swagger-autogen'

const doc = {
	info: {
		version: "1.0.0",
		title: 'SkyDrone API',
		description: 'Open documentation for the SkyDrone project API.'
	},
	host: 'skydrone-api.herokuapp.com',
	basepath: '/',
	schemes: ['http','https'],
	consumes: ['application/json'],
    produces: ['application/json'],
	servers: [
		{
			url: 'https://skydrone-api.herokuapp.com/'
		}
	],
	security: {
		bearerAuth: []
	},
	securityDefinitions: {
		bearerAuth: {
			type: 'http',
			scheme: 'bearer',
			bearerFormat: 'JWT'
		}
	},
	tags: [
		{
			"name": "API root",
			"description": "Return the API root state"
		},
		{
			"name": "The Users",
			"description": "Operations about users"
		},
		{
			"name": "The Drones",
			"description": "Everythings about our drones"
		},
		{
			"name": "The Orders",
			"description": "Operations about orders"
		}
	],
	components: {
		schemas: {
			user: {
				$email: 'api@skydrone.com',
				$password: 'encrypted',
				$firstName_u: 'Sky',
				$lastName_u: 'Drone',
				$company_u: 'SkyDrone Inc',
				$key_r: 1,
				$siret_u: 'FR0123456789',
				$address_u: '21 Rue Des Ailes',
				$phone_u: '+33000000000'
			},
			drone: {
				$name_d: 'Model A',
				category_id: 'category_id',
				$description_d: 'A',
				$pricePerDay_d: 123,
				processState_id: 'processState_id'
			},
			role: {
				$name_r: 'administrator',
				$description_r: 'Create Read Update Delete any data',
				$key_r: 1
			},
			categories: {
				$name_cat: 'D',
				$description_cat: 'les aéronefs utilisés pour un travail aérien d’une masse au décollage inférieure à 2 Kg (structure + charge)',
				$key_cat: 1
			}
		}
	}
}
const outputFile = './swagger-output.json'
const endpointFiles = ['./server.js']

swaggerAutogen({ openapi: '3.0.0' })(outputFile, endpointFiles, doc)