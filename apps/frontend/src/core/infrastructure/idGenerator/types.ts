import { type Id } from '@domain/types';

export type TIdSource = () => Id;

export interface IIdGenerator {
	getId(): Id;
}
