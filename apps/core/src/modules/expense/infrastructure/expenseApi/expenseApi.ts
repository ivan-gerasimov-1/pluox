import type { Id } from '@pluox/core/src/domain/types';

import type { IApiClient } from '@pluox/core/src/infrastructure/apiClient/types';

import type { IExpenseApi } from '@pluox/core/src/modules/expense/infrastructure/expenseApi/types';

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
