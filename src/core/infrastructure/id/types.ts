import { type Id } from '@domain/types';

export type TIdProvider = () => Id;

export interface IIdGenerator {
	getId(): Id;
}
