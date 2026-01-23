import type { IValueObject } from '@pluox/core/src/domain/valueObject/types';

export abstract class ValueObject<T> implements IValueObject<T> {
	protected value: T;

	constructor(value: T) {
		this.value = value;
	}

	public getValue(): T {
		return this.value;
	}

	public equals(valueObject: ValueObject<T>): boolean {
		return this.value === valueObject.value;
	}
}
