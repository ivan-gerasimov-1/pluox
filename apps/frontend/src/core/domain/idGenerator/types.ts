import type { Id } from '@root/core/domain/types';

export interface IIdGenerator {
	getId(): Id;
}
