import { UserError } from '@root/core/modules/user/domain/errors';

export class UserNotFoundError extends UserError {
	constructor() {
		super('User not found');
	}
}
