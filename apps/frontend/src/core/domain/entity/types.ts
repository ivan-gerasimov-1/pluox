import type { Id } from '@domain/types';
import { TISODateString } from '@root/core/domain/temporal/types';

export interface IEntity {
	readonly id: Id;
	readonly createdAt: TISODateString;
	readonly modifiedAt: TISODateString;
}
