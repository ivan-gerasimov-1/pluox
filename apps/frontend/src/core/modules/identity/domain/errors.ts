export abstract class IdentityError extends Error {
	constructor(message: string) {
		super(message);
		this.name = this.constructor.name;
	}
}

export class InvalidCredentialsError extends IdentityError {
	constructor() {
		super('Invalid credentials');
	}
}
