import { MongoClient } from "mongodb";

export default class Repository {
	static singletone
	constructor (options = {uri, serverApi, dbName, collectionName}) {
		const {
			uri,
			serverApi,
			dbName,
			collectionName
		} = options
		try {
			if (typeof(Repository.singletone) == 'undefined') {
				const client = new MongoClient(uri, {serverApi: serverApi});
				const db = client.db(dbName);
				const collection = db.collection(collectionName);
				Repository.singletone = {
					client: client,
					db: db,
					collection: collection
				}
			}
			return Repository.singletone

		} catch (e) {
			Repository.singletone?.client?.close()
			throw e
		}
	}

	static async get (query, limit){
		const repo = Repository.singletone
		try {
			await repo.client.connect()
			let res
			if (query)
				res = await repo.collection.find(query, {limit: limit})
			else
				res = await repo.collection.find({limit:limit})
			return await res.toArray()
		} catch (e) {
			throw e
		} finally {
			await repo.client.close()
		}
	}

	static async add (data){
		const repo = Repository.singletone
		try {
			await repo.client.connect()
			return await repo.collection.insertOne(data)
		} catch (e) {
			throw e
		} finally {
			await repo.client.close()
		}
	}

	static async update ({filter, values}){
		const repo = Repository.singletone
		try {
			await repo.client.connect()
			return await repo.collection.updateOne(filter, {$set: values})
		} catch (e) {
			throw e
		} finally {
			await repo.client.close()
		}
	}

	static async delete (query){
		const repo = Repository.singletone
		try {
			await repo.client.connect()
			if (query)
				return  await repo.collection.deleteOne(query)
		} catch (e) {
			throw e
		} finally {
			repo.client.close()
		}
	}
}