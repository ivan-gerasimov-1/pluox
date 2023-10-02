import { AppConfig } from '@core/infrastructure/appConfig/AppConfig';
import type { ECurrency } from '@core/infrastructure/currency/types';
import type { IAmount } from '@domain/amount/types';
import {
	MonthlyAmountUseCase,
	type IMonthlyAmountUseCase,
} from '@domain/amount/useCases/monthlyAmountUseCase';
import {
	TotalAmountUseCase,
	type ITotalAmountUseCase,
} from '@domain/amount/useCases/totalAmountUseCase';
import type { TMonth } from '@domain/amount/useCases/types';
import type { IExpenses } from '@domain/expenses/types';

export class Amount implements IAmount {
	readonly #defaultCurrency: ECurrency;

	private constructor(
		private readonly totalAmountUseCase: ITotalAmountUseCase,
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
		let appConfig = AppConfig.getInstance();
		let totalAmountUseCase = TotalAmountUseCase.create(expenses);
		let monthlyAmountUseCase = MonthlyAmountUseCase.create(expenses);

		return new Amount(totalAmountUseCase, monthlyAmountUseCase, {
			defaultCurrency: appConfig.currency,
		});
	}

	public getTotal(): number {
		return this.totalAmountUseCase.run(this.#defaultCurrency);
	}

	public getMonthly(month: TMonth): number {
		return this.monthlyAmountUseCase.run(month, this.#defaultCurrency);
	}
}
