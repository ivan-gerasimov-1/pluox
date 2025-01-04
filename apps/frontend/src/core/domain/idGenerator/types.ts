import type { Id } from '@domain/types';

export interface IIdGenerator {
	getId(): Id;
}
