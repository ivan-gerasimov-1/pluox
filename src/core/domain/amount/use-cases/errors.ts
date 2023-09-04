export class InvalidMonthError extends Error {
	constructor(month: number) {
		super(`Month "${month}" is not a valid month`);
	}
}
