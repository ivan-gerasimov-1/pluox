import type { TCurrencyRateDTO } from '@root/core/modules/currency/application/dto/currencyRateDTO';
import type { ECurrency } from '@root/core/modules/currency/domain/types';

export interface ICurrencyRateRepository {
	/** @todo Not Implemented */
	create(currency: TCurrencyRateDTO): TCurrencyRateDTO;
	/** @todo Not Implemented */
	update(currency: TCurrencyRateDTO): TCurrencyRateDTO;

	findAll(): TCurrencyFindManyResult;
	/** @todo Not Implemented */
	findOne(query: unknown): TCurrencyRateDTO;

	/**
	 * @throws {CategoryNotFoundError}
	 */
	findByCode(code: ECurrency): TCurrencyRateDTO;

	findRateByCode(code: ECurrency): number;

	/**
	 * @throws {CategoryNotFoundError}
	 */
	remove(code: ECurrency): void;
}

export type TCurrencyFindManyResult = {
	items: TCurrencyRateDTO[];
	total: number;
};
