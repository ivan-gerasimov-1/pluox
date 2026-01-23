export class SessionError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'SessionError';
	}
}

export class InvalidSessionFactoryArgumentsError extends Error {
	constructor() {
		super(
			'Invalid arguments passed to create method. Expected clientId, userId and authToken (optional) or sessionDTO.',
		);
	}
}
