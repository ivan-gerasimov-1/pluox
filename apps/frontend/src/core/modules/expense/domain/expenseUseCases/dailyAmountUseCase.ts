import type { IUseCase } from '@root/core/domain/types';
import { IAppConfig } from '@root/core/infrastructure/appConfig/appConfig';
import type { ITemporal } from '@root/core/infrastructure/temporal/types';
import type { ICurrencyRateService } from '@root/core/modules/currency/application/currencyRateService/types';
import type { IExpenseRepository } from '@root/core/modules/expense/domain/expenseRepository/types';

export interface IDailyAmountUseCase extends IUseCase {
	execute(): number;
}

export class DailyAmountUseCase implements IDailyAmountUseCase {
	constructor(
		private readonly expenseRepository: IExpenseRepository,
		private readonly temporal: ITemporal,
		private readonly currencyRatesService: ICurrencyRateService,
		private readonly appConfig: IAppConfig,
	) {}

	public execute(): number {
		return this.calculateAmount();
	}

	private calculateAmount(): number {
		let startOfDay = this.temporal.getStartOfDay();
		let endOfDay = this.temporal.getEndOfDay();

		let expenses = this.expenseRepository.findMany();

		let currency = this.appConfig.currency;

		let total = 0;

		for (const expense of expenses.items) {
			if (expense.date >= startOfDay && expense.date <= endOfDay) {
				total += this.currencyRatesService.convert(
					expense.amount,
					expense.currency,
					currency,
				);
			}
		}

		return total;
	}
}
