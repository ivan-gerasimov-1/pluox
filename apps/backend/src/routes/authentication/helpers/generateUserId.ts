import { generateId } from '../../../helpers/generateId';

const USER_ID_PREFIX = 'USR';

export function generateUserId(): string {
	return generateId(USER_ID_PREFIX);
}
