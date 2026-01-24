import type { Id } from '@core/domain/types';

export interface IIdGenerator {
	getId(): Id;
}
