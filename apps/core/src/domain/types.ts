export type Id = string;
export type TCategory = string;
export type TDescription = string | undefined;

export interface IUseCase {
	execute(...args: unknown[]): void;
}
