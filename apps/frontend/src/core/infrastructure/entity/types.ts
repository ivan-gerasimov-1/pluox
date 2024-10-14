import { Id } from '@domain/types';

export interface IEntity<TEntityDTO> {
	readonly id: Id;

	toObject(): TEntityDTO;
}
