import type { Id } from '@root/core/domain/types';
import type { TCurrencyRateDTO } from '@root/core/modules/currency/application/dto/currencyRateDTO';
import type {
	ICurrencyRateRepository,
	TCurrencyFindManyResult,
} from '@root/core/modules/currency/domain/currencyRateRepository/currencyRateRepository';
import type { ECurrency } from '@root/core/modules/currency/domain/types';
import type { ICurrencyRateDataSource } from '@root/core/modules/currency/infrastructure/currencyRateDataSource/types';

export class CurrencyRateRepository implements ICurrencyRateRepository {
	constructor(
		private readonly currencyRateDataSource: ICurrencyRateDataSource,
	) {}

	public create(currency: TCurrencyRateDTO): TCurrencyRateDTO {
		throw new NotImplementedError();
	}

	public update(currency: TCurrencyRateDTO): TCurrencyRateDTO {
		throw new NotImplementedError();
	}

	public findAll(): TCurrencyFindManyResult {
		throw new NotImplementedError();
	}

	public findByCode(code: ECurrency): TCurrencyRateDTO {
		let rate = this.currencyRateDataSource.findById(code);

		return {
			code,
			rate,
		};
	}

	public findRateByCode(code: ECurrency): number {
		return this.currencyRateDataSource.findById(code);
	}

	public remove(id: Id): void {
		throw new NotImplementedError();
	}
}

export class NotImplementedError extends Error {
	constructor() {
		super('Not Implemented');
	}
}
