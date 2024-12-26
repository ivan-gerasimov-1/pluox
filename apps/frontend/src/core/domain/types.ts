export type Id = string;
export type TCategory = string | null;
export type TDescription = string | undefined;

export interface IUseCase {
	execute(...args: unknown[]): void;
}
