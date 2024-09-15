import { generateId } from '../../../helpers/generateId';

const EXPENSE_ID_PREFIX = 'EXP';

export function generateExpenseId(): string {
	return generateId(EXPENSE_ID_PREFIX);
}
