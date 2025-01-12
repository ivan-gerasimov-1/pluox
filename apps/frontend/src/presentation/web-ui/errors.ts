export class HTMLElementNotFoundError extends Error {
	constructor(id: string) {
		super(`HTML Element with id "${id}" not found`);
	}
}

export class AppContainerNotInitializedError extends Error {
	constructor() {
		super('App container not initialized');
	}
}
