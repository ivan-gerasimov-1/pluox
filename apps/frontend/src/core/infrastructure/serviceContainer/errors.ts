export class ContainerSealedError extends Error {
	constructor() {
		super('Container is already sealed. Cannot register new providers.');
	}
}

export class ContainerNotSealedError extends Error {
	constructor() {
		super(
			'Container is not sealed. Call seal() after registering all providers.',
		);
	}
}
