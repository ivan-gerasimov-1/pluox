import { getGlobalContainer } from '@root/diContainer';

import type { IBaseApi } from '@core/infrastructure/baseApi/types';
import type { IExpensesApi } from '@core/infrastructure/expensesApi/types';

import type { Id } from '@domain/types';

import { EServiceToken } from '@modules/serviceContainer/types';

export class ExpensesApi implements IExpensesApi {
	static #instance: IExpensesApi;

	private constructor(private readonly api: IBaseApi) {}

	public static getInstance(): IExpensesApi {
		if (!this.#instance) {
			const api = getGlobalContainer().get(EServiceToken.BASE_API);

			this.#instance = new ExpensesApi(api);
		}

		return this.#instance;
	}

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
