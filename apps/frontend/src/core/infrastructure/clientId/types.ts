import type { Id } from '@domain/types';

export interface IClientId {
	get(): Id;
}
