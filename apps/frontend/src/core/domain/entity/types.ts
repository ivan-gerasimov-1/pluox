import type { Id } from '@domain/types';
import type { TISODateString } from '@root/core/domain/temporal/types';

export interface IEntity {
	readonly id: Id;
	readonly createdAt: TISODateString;
	readonly modifiedAt: TISODateString;
}
