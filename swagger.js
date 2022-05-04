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
			url: 'https://skydrone-api.herokuapp.com/',
			url: 'http://localhost:3000/'
		}
	],
	security: {
		bearerAuth: []
	},
	securityDefinitions: {
		bearerAuth: {
			type: 'apiKey',
			name: 'Authorization',
			in: 'header'
			/*
			Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYyMjdkZDQ4Y2FhMDA2MmMxY2NlNjE0ZiIsImVtYWlsIjoiZW1haWwyQGVtYWlsLmZyIiwiZmlyc3ROYW1lX3UiOiJmaXJzdG5hbWUiLCJsYXN0TmFtZV91IjoibGFzdG5hbWUiLCJrZXlfciI6MCwiY29tcGFueV91IjoiY29tcGFueVUiLCJwaG9uZV91IjoicGhvbmUiLCJhZGRyZXNzX3UiOiJhZGRyZXNzIiwic2lyZXRfdSI6InNpcmV0In0sImlhdCI6MTY1MTY3NDY2NH0.F-XWLN311xbqhMS5xXrEE_yFS9x2SQlETNXhoGUIdqg
			*/
		}
	},
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
				updateBy_o: 'idUser'
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
			},
			qrCodes: {
				$base_url: "http://localhost:3000/api/v1/drones/61fa5c9665b3c0001671b770"
			}
		}
	}
}
const outputFile = './swagger-output.json'
const endpointFiles = ['./server.js']

swaggerAutogen({ openapi: '3.0.0' })(outputFile, endpointFiles, doc)