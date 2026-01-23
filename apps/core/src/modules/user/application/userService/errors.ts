import { UserError } from '@pluox/core/src/modules/user/domain/errors';

export class UserNotFoundError extends UserError {
	constructor() {
		super('User not found');
	}
}
