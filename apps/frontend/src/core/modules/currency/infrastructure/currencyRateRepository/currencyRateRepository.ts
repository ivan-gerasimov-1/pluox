import type { Id } from '@root/core/domain/types';
import type { TCurrencyRateDTO } from '@root/core/modules/currency/application/dto/currencyRateDTO';
import type {
	ICurrencyRateRepository,
	TCurrencyFindManyResult,
} from '@root/core/modules/currency/domain/currencyRateRepository/currencyRateRepository';
import type { ECurrency } from '@root/core/modules/currency/domain/types';
import type { ICurrencyRatesDataSource } from '@root/core/modules/currency/infrastructure/currencyRatesDataSource/types';

export class CurrencyRateRepository implements ICurrencyRateRepository {
	constructor(
		private readonly currencyRateDataSource: ICurrencyRatesDataSource,
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

	public findOne(): TCurrencyRateDTO {
		throw new NotImplementedError();
	}

	public findByCode(code: ECurrency): TCurrencyRateDTO {
		let rate = this.currencyRateDataSource.find(code);

		return {
			code,
			rate,
		};
	}

	public findRateByCode(code: ECurrency): number {
		let currencyRateDTO = this.findByCode(code);

		return currencyRateDTO.rate;
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
