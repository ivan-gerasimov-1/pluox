import type { Id } from '@pluox/core/src/domain/types';

export interface IExpenseApi {
	create(payload: Record<string, unknown>): Promise<{
		id: Id;
	}>;
}
