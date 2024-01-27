import { type Id } from '@domain/types';

export interface IExpensesApi {
	create(payload: Record<string, unknown>): Promise<{
		id: Id;
	}>;
}
