import type { Id } from '@root/core/domain/types';
import type { IValueObject } from '@root/core/domain/valueObject/types';

export interface IClientIdFactory {
	create(existingId?: Id | null): IClientId;
}

export interface IClientId extends IValueObject<Id> {}
