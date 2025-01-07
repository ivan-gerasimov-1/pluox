import { IdentityError } from '@root/core/modules/identity/domain/errors';

export class SessionNotFoundError extends IdentityError {
	constructor() {
		super('Session not found');
	}
}
