import express from 'express'
import Person from './person.js'
import { EBadMethod, EBadRequest, ENotFound } from './error.js'

const router = express.Router()
router.use(express.json())

function sendOk(res) {
	res.send({success: true})
}

function sendError(res, e) {
	let msg = {success: false}
	if (e.code)
		res.status(e.code).send(msg)
	else
		res.status(500).send(msg)
}

router.get('/', async (req, res) => {
	try {
		const data = await Person.find(req.query)
		if (data.length > 0)
			res.send({total:data.length, data:data})
		else
			throw new ENotFound()
	} catch (e) {
		sendError(res, e)
	}
})

router.post('/', async (req, res) => {
	try {
		if (!req.body ||
			!req.body.lname ||
			!req.body.fname ||
			!req.body.phone ||
			!req.body.bday)
			throw new EBadRequest('empty required fields')
		await Person.create(req.body)
		sendOk(res)
	} catch (e) {
		sendError(res, e)
	}
})

router.patch('/', async (req, res) => {
	try {
		if (!req.body.id)
			throw new EBadRequest('empty required fields')
		if (req.body ||
			req.body.fname ||
			req.body.lname ||
			req.body.phone ||
			req.body.bday) {
			await Person.update(req.body)
			sendOk(res)
		} else
			throw new EBadRequest('empty required fields')
	} catch (e) {
		sendError(res, e)
	}
})

router.delete('/', async (req, res) => {
	try {
		if (!req.body.id)
			throw new EBadRequest('empty required fields')
		await Person.delete(req.body)
		sendOk(res)
	} catch (e) {
		sendError(res, e)
	}
})

export { router }