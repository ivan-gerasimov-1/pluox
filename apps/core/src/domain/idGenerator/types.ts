import type { Id } from '@pluox/core/src/domain/types';

export interface IIdGenerator {
	getId(): Id;
}
