export type Id = string;
export type TISODateString = string;
export type TCategory = string | null;
export type TComment = string | undefined;

export interface IUseCase {
	execute(...args: unknown[]): void;
}
