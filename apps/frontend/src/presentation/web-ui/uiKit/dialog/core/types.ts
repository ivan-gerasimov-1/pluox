export interface IDisposable {
	dispose(): void;
}

export interface IIdGenerator {
	(): string;
}
