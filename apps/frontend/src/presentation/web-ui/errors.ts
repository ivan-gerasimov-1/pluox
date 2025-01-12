export class HTMLElementNotFoundError extends Error {
	constructor(id: string) {
		super(`HTML Element with id "${id}" not found`);
	}
}

export class NotInitializedError extends Error {
	constructor() {
		super('Not initialized');
	}
}
