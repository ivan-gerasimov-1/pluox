import { IdentityError } from '@root/core/modules/identity/domain/errors';

export class InvalidCredentialsError extends IdentityError {
	constructor() {
		super('Invalid credentials');
	}
}
