import type { IApiClient } from '@root/core/infrastructure/apiClient/types';
import type { IExpenseApi } from '@root/core/modules/expense/infrastructure/expenseApi/types';

import type { Id } from '@domain/types';

export class ExpenseApi implements IExpenseApi {
	constructor(private readonly apiClient: IApiClient) {}

	public async create(payload: Record<string, unknown>): Promise<{
		id: Id;
	}> {
		const response = await this.apiClient.post<
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
