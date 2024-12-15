import type { IBaseApi } from '@core/infrastructure/baseApi/types';
import type { IExpensesApi } from '@root/core/modules/expense/infrastructure/expensesApi/types';

import type { Id } from '@domain/types';

export class ExpensesApi implements IExpensesApi {
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
