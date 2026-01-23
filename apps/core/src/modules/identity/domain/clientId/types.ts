import type { Id } from '@pluox/core/src/domain/types';
import type { IValueObject } from '@pluox/core/src/domain/valueObject/types';

export interface IClientIdFactory {
	create(existingId?: Id | null): IClientId;
}

export interface IClientId extends IValueObject<Id> {}
