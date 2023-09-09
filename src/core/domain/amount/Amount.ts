import { AppConfig } from '@core/infrastructure/appConfig/AppConfig';
import type { ECurrency } from '@core/infrastructure/currency/types';
import { IAmount } from '@domain/amount/types';
import type { IExpenses } from '@domain/expenses/types';
import {
	MonthlyAmountUseCase,
	type IMonthlyAmountUseCase,
} from '@domain/amount/useCases/monthlyAmountUseCase';
import {
	TotalAmountUseCase,
	type ITotalAmountUseCase,
} from '@domain/amount/useCases/totalAmountUseCase';
import { type TISODateString } from '@domain/types';

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

	public getMonthly(currentDate: TISODateString): number {
		return this.monthlyAmountUseCase.run(currentDate, this.#defaultCurrency);
	}
}
