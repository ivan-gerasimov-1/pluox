import type { Id } from '@domain/types';

export interface IClientIdStorage {
	setId(clientId: Id): IClientIdStorage;
	getId(): Id | null;
}
