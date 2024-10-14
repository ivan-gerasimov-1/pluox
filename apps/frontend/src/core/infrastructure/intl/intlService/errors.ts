export class UnsupportedDecimalSeparatorError extends Error {
	constructor(separator: string) {
		super(`Unsupported decimal separator: ${separator}`);
	}
}
