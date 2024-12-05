import { IdGenerator } from '@core/infrastructure/idGenerator/IdGenerator';
import type { IIdGenerator } from '@core/infrastructure/idGenerator/types';
import { customAlphabet } from 'nanoid';

const ID_LENGTH = 14;
const ID_ALPHABET =
	'0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

export function idGeneratorFactory(options?: {
	length?: number;
	alphabet?: string;
}): IIdGenerator {
	let nanoId = customAlphabet(
		options?.alphabet || ID_ALPHABET,
		options?.length || ID_LENGTH,
	);

	return new IdGenerator(nanoId);
}
