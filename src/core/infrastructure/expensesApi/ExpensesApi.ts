import { BaseApi } from '@core/infrastructure/baseApi/BaseApi';
import { type IBaseApi } from '@core/infrastructure/baseApi/types';
import { IExpensesApi } from '@core/infrastructure/expensesApi/types';
import { type Id } from '@domain/types';

export class ExpensesApi implements IExpensesApi {
	static #instance: IExpensesApi;

	private constructor(private readonly api: IBaseApi) {}

	public static getInstance(): IExpensesApi {
		if (!this.#instance) {
			const api = BaseApi.getInstance();

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
