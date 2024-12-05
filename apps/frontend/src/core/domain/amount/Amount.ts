import { getGlobalContainer } from '@root/diContainer';

import type { ECurrency } from '@core/infrastructure/currency/types';

import type { IAmount } from '@domain/amount/types';
import {
	TotalAmountUseCase,
	type IMonthlyAmountUseCase,
} from '@domain/amount/useCases/totalAmountUseCase';
import type { TMonth, TYear } from '@domain/amount/useCases/types';
import type { IExpenses } from '@domain/expenses/types';

import { EServiceToken } from '@modules/serviceContainer/types';

export class Amount implements IAmount {
	readonly #defaultCurrency: ECurrency;

	private constructor(
		private readonly monthlyAmountUseCase: IMonthlyAmountUseCase,
		params: {
			defaultCurrency: ECurrency;
		},
	) {
		this.#defaultCurrency = params.defaultCurrency;
	}

	public static create(expenses: IExpenses) {
		/**
		 * @todo Use DI instead of direct instantiation
		 */
		let appConfig = getGlobalContainer().get(EServiceToken.APP_CONFIG);
		let monthlyAmountUseCase = TotalAmountUseCase.create(expenses);

		return new Amount(monthlyAmountUseCase, {
			defaultCurrency: appConfig.currency,
		});
	}

	/**
	 * @todo Add year to the class interface
	 */
	public getTotalByYear(year: TYear = new Date().getFullYear()): number {
		return this.monthlyAmountUseCase.run(
			{
				year,
			},
			this.#defaultCurrency,
		);
	}

	/**
	 * @todo Add year to the class interface
	 */
	public getTotalByMonth(
		month: TMonth,
		year: TYear = new Date().getFullYear(),
	): number {
		return this.monthlyAmountUseCase.run(
			{
				month,
				year,
			},
			this.#defaultCurrency,
		);
	}
}
