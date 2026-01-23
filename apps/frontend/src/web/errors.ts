export class HTMLElementNotFoundError extends Error {
	constructor(id: string) {
		super(`HTML Element with id "${id}" not found`);

		this.name = 'HTMLElementNotFoundError';
	}
}

export class AppContainerNotInitializedError extends Error {
	constructor() {
		super('App container not initialized');

		this.name = 'AppContainerNotInitializedError';
	}
}
