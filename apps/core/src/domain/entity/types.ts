import type { TISODateString } from '@core/domain/temporal/types';
import type { Id } from '@core/domain/types';

export interface IEntity {
	readonly id: Id;
	readonly createdAt: TISODateString;
	readonly modifiedAt: TISODateString;
}
