export class ReactContextNotInitializedError extends Error {
	constructor(contextName: string) {
		super(`${contextName} is empty`);
	}
}
