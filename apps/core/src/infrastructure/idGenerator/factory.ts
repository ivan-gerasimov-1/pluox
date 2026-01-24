import type { IIdGenerator } from '@core/domain/idGenerator/types';
import { IdGenerator } from '@core/infrastructure/idGenerator/idGenerator';
import { customAlphabet } from 'nanoid';

export interface IIdGeneratorFactory {
	create(options?: { length?: number; alphabet?: string }): IIdGenerator;
}

export class IdGeneratorFactory {
	static #ID_LENGTH = 14;
	static #ID_ALPHABET =
		'0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

	public create(options?: {
		length?: number;
		alphabet?: string;
	}): IIdGenerator {
		let nanoId = customAlphabet(
			options?.alphabet || IdGeneratorFactory.#ID_ALPHABET,
			options?.length || IdGeneratorFactory.#ID_LENGTH,
		);

		return new IdGenerator(nanoId);
	}
}
