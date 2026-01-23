import { IdentityError } from '@pluox/core/src/modules/identity/domain/errors';

export class InvalidCredentialsError extends IdentityError {
	constructor() {
		super('Invalid credentials');
	}
}
