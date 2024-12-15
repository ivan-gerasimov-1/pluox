import type { IBaseApi } from '@core/infrastructure/baseApi/types';
import type { IExpenseApi } from '@root/core/modules/expense/infrastructure/expenseApi/types';

import type { Id } from '@domain/types';

export class ExpenseApi implements IExpenseApi {
	constructor(private readonly api: IBaseApi) {}

	public async create(payload: Record<string, unknown>): Promise<{
		id: Id;
	}> {
		const response = await this.api.request<
			Record<string, unknown>,
			{
				id: Id;
			}
		>('/expenses', payload);

		return {
			id: response.id,
		};
	}
}
