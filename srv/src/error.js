class EBadRequest extends Error {
	constructor (message) {
		super(`bad request: ${message}`)
	}

	get code () {
		return 400
	}
}

class ENotFound extends Error {
	constructor (message) {
		super(`not found: ${message}`)
	}
	get code () {
		return 404
	}
}

class EBadMethod extends Error {
	constructor (message) {
		super(`method not allowed: ${message}`)
	}
	get code () {
		return 405
	}
}

export {
	EBadRequest,
	ENotFound,
	EBadMethod
}