import type { TISODateString } from '@root/core/domain/temporal/types';
import type { Id } from '@root/core/domain/types';

export interface IEntity {
	readonly id: Id;
	readonly createdAt: TISODateString;
	readonly modifiedAt: TISODateString;
}
