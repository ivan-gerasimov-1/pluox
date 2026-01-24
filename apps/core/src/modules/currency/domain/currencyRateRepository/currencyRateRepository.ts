import type { TCurrencyRateDTO } from '@core/modules/currency/application/dto/currencyRateDTO';
import type { TCurrency } from '@core/modules/currency/domain/types';

export interface ICurrencyRateRepository {
	/** @todo Not Implemented */
	create(currency: TCurrencyRateDTO): TCurrencyRateDTO;
	/** @todo Not Implemented */
	update(currency: TCurrencyRateDTO): TCurrencyRateDTO;

	findAll(): TCurrencyFindManyResult;

	/**
	 * @throws {CategoryNotFoundError}
	 */
	findByCode(code: TCurrency): TCurrencyRateDTO;
	findRateByCode(code: TCurrency): number;

	/**
	 * @throws {CategoryNotFoundError}
	 */
	remove(code: TCurrency): void;
}

export type TCurrencyFindManyResult = {
	items: TCurrencyRateDTO[];
	total: number;
};
