import type { Id } from '@/core/domain/types';
import type { IValueObject } from '@/core/domain/valueObject/types';

export interface IClientIdFactory {
	create(existingId?: Id | null): IClientId;
}

export interface IClientId extends IValueObject<Id> {}
