import type { Id } from '@pluox/core/src/domain/types';

import type { TCurrencyRateDTO } from '@pluox/core/src/modules/currency/application/dto/currencyRateDTO';
import type {
	ICurrencyRateRepository,
	TCurrencyFindManyResult,
} from '@pluox/core/src/modules/currency/domain/currencyRateRepository/currencyRateRepository';
import type { TCurrency } from '@pluox/core/src/modules/currency/domain/types';
import type { ICurrencyRateDataSource } from '@pluox/core/src/modules/currency/infrastructure/currencyRateDataSource/types';

export class CurrencyRateRepository implements ICurrencyRateRepository {
	constructor(
		private readonly currencyRateDataSource: ICurrencyRateDataSource,
	) {}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public create(currency: TCurrencyRateDTO): TCurrencyRateDTO {
		throw new NotImplementedError();
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public update(currency: TCurrencyRateDTO): TCurrencyRateDTO {
		throw new NotImplementedError();
	}

	public findAll(): TCurrencyFindManyResult {
		throw new NotImplementedError();
	}

	public findByCode(code: TCurrency): TCurrencyRateDTO {
		let rate = this.currencyRateDataSource.findById(code);

		return {
			code,
			rate,
		};
	}

	public findRateByCode(code: TCurrency): number {
		return this.currencyRateDataSource.findById(code);
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public remove(id: Id): void {
		throw new NotImplementedError();
	}
}

export class NotImplementedError extends Error {
	constructor() {
		super('Not Implemented');
	}
}
