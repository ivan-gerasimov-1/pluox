import type { TISODateString } from '@pluox/core/src/domain/temporal/types';
import type { Id } from '@pluox/core/src/domain/types';

export interface IEntity {
	readonly id: Id;
	readonly createdAt: TISODateString;
	readonly modifiedAt: TISODateString;
}
