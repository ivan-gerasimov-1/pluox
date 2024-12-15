import type { ECurrency } from '@core/infrastructure/currency/types';
import type { IAppConfig } from '@core/infrastructure/appConfig/AppConfig';

import type { IAmount } from '@domain/amount/types';
import type { ITotalAmountUseCase } from '@root/core/modules/expense/domain/expenseUseCases/totalAmountUseCase/totalAmountUseCase';
import type {
	TMonth,
	TYear,
} from '@root/core/modules/expense/domain/expenseUseCases/totalAmountUseCase/types';

/**
 * @deprecated
 */
export class Amount implements IAmount {
	readonly #defaultCurrency: ECurrency;

	constructor(
		private readonly appConfig: IAppConfig,
		private readonly monthlyAmountUseCase: ITotalAmountUseCase,
	) {
		this.#defaultCurrency = this.appConfig.currency;
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
