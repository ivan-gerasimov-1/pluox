import type { Id } from '@root/core/domain/types';

export interface IExpenseApi {
	create(payload: Record<string, unknown>): Promise<{
		id: Id;
	}>;
}
