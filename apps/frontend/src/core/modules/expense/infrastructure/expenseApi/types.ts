import type { Id } from '@domain/types';

export interface IExpenseApi {
	create(payload: Record<string, unknown>): Promise<{
		id: Id;
	}>;
}
