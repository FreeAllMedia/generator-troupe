export class ApiKeyRequiredError extends Error {
	constructor(message) {
		super(message);
		this.name = "Api-Key Required";
		this.message = message || "An Api-Key is required to authenticate a client.";
	}
}

export class InvalidApiKeyError extends Error {
	constructor(message) {
		super(message);
		this.name = "Invalid Api-Key";
		this.message = message || "The api-key provided is invalid.";
	}
}

export class InvalidAccessTokenError extends Error {
	constructor(message) {
		super(message);
		this.name = "Invalid Access-Token";
		this.message = message || "The access token provided is invalid.";
	}
}

export class ExpiredAccessTokenError extends Error {
	constructor(message) {
		super(message);
		this.name = "Expired Access-Token";
		this.message = message || "The access token provided is expired.";
	}
}

export class InsufficientPermissionsError extends Error {
	constructor(message) {
		super(message);
		this.name = "Insufficient Permissions";
		this.message = message || "Your permissions does not allow you to manipulate the requested resource.";
	}
}

export class BadRequestError extends Error {
	constructor(message) {
		super(message);
		this.name = "Bad Request";
		this.message = message || "Malformed request.";
	}
}

export class NotFoundError extends Error {
	constructor(message) {
		super(message);
		this.name = "Not Found";
		this.message = message || "Entity not found.";
	}
}
