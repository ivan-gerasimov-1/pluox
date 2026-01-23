import { IdentityError } from '@pluox/core/src/modules/identity/domain/errors';

export class SessionNotFoundError extends IdentityError {
	constructor() {
		super('Session not found');
	}
}
