import { getGlobalContainer } from '@root/diContainer';

import type { ECurrency } from '@core/infrastructure/currency/types';

import type { IAmount } from '@domain/amount/types';
import type { ITotalAmountUseCase } from '@domain/amount/useCases/totalAmountUseCase';
import type { TMonth, TYear } from '@domain/amount/useCases/types';

import { EServiceToken } from '@modules/serviceContainer/types';

export class Amount implements IAmount {
	readonly #defaultCurrency: ECurrency;

	private constructor(
		private readonly monthlyAmountUseCase: ITotalAmountUseCase,
		params: {
			defaultCurrency: ECurrency;
		},
	) {
		this.#defaultCurrency = params.defaultCurrency;
	}

	public static create() {
		/**
		 * @todo Use DI instead of direct instantiation
		 */
		let appConfig = getGlobalContainer().get(EServiceToken.APP_CONFIG);
		let totalAmountUseCase = getGlobalContainer().get(
			EServiceToken.TOTAL_AMOUNT_USE_CASE,
		);

		return new Amount(totalAmountUseCase, {
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
