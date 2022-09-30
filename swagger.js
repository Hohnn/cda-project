import swaggerAutogen from 'swagger-autogen'

const doc = {
	info: {
		version: "1.0.0",
		title: 'SkyDrone API',
		description: 'Open documentation for the SkyDrone project API.'
	},
	basepath: '/',
	schemes: ['http', 'https'],
	consumes: ['application/json'],
	produces: ['application/json'],
	servers: [
		{
			url: 'https://skydrone-api.herokuapp.com/'
		},
		{
			url: 'http://localhost:3000/'
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
	components: {
		schemas: {
			user: {
				$email: "test@skydrone.fr",
				$password: "password",
				$firstName_u: "firstname",
				$lastName_u: "lastname",
				$company_u: "company",
				$phone_u: "phone",
				$address_u: "address",
				$zipCode_u: 76600,
				$country_u: "pays",
				$siret_u: "siret"
			},
			drone: {
				$name_d: 'Model A',
				$category_id: 'category_id',
				$description_d: 'A',
				$pricePerDay_d: 123,
				$state: 'Available'
			},
			order: {
				$user_id: 'Model A',
				$drone_id: 'category_id',
				$startAt_o: '2022-01-01',
				$endAt_o: '2022-12-01',
				report_o: 'a report',
				$createdBy_o: 'idUser',
				updateBy_o: 'idUser',
				state_o: 'pending'
			},
			role: {
				$name_r: 'Administrateur',
				$key_r: 1
			},
			categories: {
				$name_cat: 'D',
				$description_cat: 'les aéronefs utilisés pour un travail aérien d’une masse au décollage inférieure à 2 Kg (structure + charge)',
				$key_cat: 1
			},
			qrCode: {
				$src: "http://localhost:3000/api/v1/drones/61fa5c9665b3c0001671b770",
				qr_code: ''
			},
			login: {
				$email: 'test@skydrone.fr',
				$password: 'password'
			},
			images: {
				$name: 'image'
			}
		}
	}
}

const outputFile = './swagger-output.json'
const endpointFiles = ['./server.js']

swaggerAutogen({ openapi: '3.0.0' })(outputFile, endpointFiles, doc)