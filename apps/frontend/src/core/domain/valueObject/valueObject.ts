import type { IValueObject } from '@root/core/domain/valueObject/types';

export abstract class ValueObject<T> implements IValueObject<T> {
	readonly #value: T;

	constructor(value: T) {
		this.#value = value;
	}

	public getValue(): T {
		return this.#value;
	}
}
