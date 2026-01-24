import type { Id } from '@core/domain/types';

export interface IExpenseApi {
	create(payload: Record<string, unknown>): Promise<{
		id: Id;
	}>;
}
