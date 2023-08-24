import { query } from "express";
import Repository from "./repository.js";
import { ObjectId } from "mongodb";

export default class Person {
	constructor ({_id, id, lname, fname, phone, bday}) {
		this.id = id ?? _id
		this.fname = fname
		this.lname = lname
		this.phone = phone
		this.bday = bday
	}
	
	static async find ({id, lname, fname, phone, bday, limit = 10, page = 0}) {
		const query = {}
		if (id) {
			query._id = new ObjectId(id)
		}
		if (lname) {
			query.lname = lname
		}
		if (fname) {
			query.fname = fname
		}
		if (phone) {
			query.phone = phone
		}
		if (bday) {
			query.bday = bday
		}
		++page
		const res = await Repository.get(query, limit * page)
		let counter = 0
		let persons = []
		for(const person of res) {
			++counter
			if (counter > page * limit - limit) {
				persons.push(new Person(person))

			}
		}
		return persons
	}

	static async create (query = {lname, fname, phone, bday}) {
		return await Repository.add(query)
	}

	static async update ({
		id,
		lname,
		fname,
		phone,
		bday
	}) {
		const query = {
			filter: {_id : new ObjectId(id)},
			values: {}
		}
		if (lname)
			query.values.lname = lname
		if (fname)
			query.values.fname = fname
		if (phone)
			query.values.phone = phone
		if (bday)
			query.values.bday = bday
		return await Repository.update(query)
	}

	static async delete ({id}) {
		return await Repository.delete({_id: new ObjectId(id)})
	}
}