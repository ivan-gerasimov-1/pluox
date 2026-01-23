import type { TCurrencyRateDTO } from '@pluox/core/src/modules/currency/application/dto/currencyRateDTO';
import type { TCurrency } from '@pluox/core/src/modules/currency/domain/types';

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
