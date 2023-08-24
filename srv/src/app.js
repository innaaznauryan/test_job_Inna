import express from 'express'
import { router } from './routes.js';
import Repository from './repository.js';
import { ServerApiVersion } from 'mongodb';

const app = express()
const PORT = process.env.APP_PORT ?? 8080;


const uri = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@mongodb/?replicaSet=rs01&retryWrites=true&w=majority&directConnection=true`;
new Repository({uri, 
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	},
	dbName: process.env.MONGO_DB_NAME,
	collectionName: process.env.MONGO_COLLECTION_NAME
});

app.use('/', router)
app.listen(
	PORT,
	() => console.log(`It's alive on http://localhost:${PORT}`)
)
