import { type Id } from '@domain/types';
import type { TIdProvider, IIdGenerator } from '@core/infrastructure/id/types';
import { customAlphabet } from 'nanoid';

export class IdGenerator implements IIdGenerator {
	static #instance?: IIdGenerator;

	static readonly #ID_LENGTH = 14;
	static readonly #ID_ALPHABET =
		'0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

	private constructor(private readonly idProvider: TIdProvider) {}

	public static create() {
		if (!this.#instance) {
			let nanoId = customAlphabet(this.#ID_ALPHABET, this.#ID_LENGTH);

			this.#instance = new IdGenerator(nanoId);
		}

		return this.#instance;
	}

	public getId(): Id {
		return this.idProvider();
	}
}
