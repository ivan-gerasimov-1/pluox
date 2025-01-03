import type { Id } from '@domain/types';

export interface IEntity<TEntityDTO> {
	readonly id: Id;

	/** @deprecated */
	toDTO(): TEntityDTO;
}
