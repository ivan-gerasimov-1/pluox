import type { Id } from '@domain/types';
import type { IValueObject } from '@root/core/domain/valueObject/types';

export interface IClientIdFactory {
	create(existingId?: Id): IClientId;
}

export interface IClientId extends IValueObject<Id> {}
