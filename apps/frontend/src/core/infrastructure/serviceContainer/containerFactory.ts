import { Container } from '@root/core/infrastructure/serviceContainer/container';
import type { IContainer } from '@root/core/infrastructure/serviceContainer/types';

export let globalContainer: IContainer;

export function containerFactory(options?: {
	isGlobal?: boolean;
	isDevelopment?: boolean;
}) {
	let container = new Container();

	if (options?.isGlobal) {
		globalContainer = container;
	}

	return container;
}

export function getGlobalContainer(): IContainer {
	if (!globalContainer) {
		throw new GlobalContainerNotInitializedError();
	}

	return globalContainer;
}

export class GlobalContainerNotInitializedError extends Error {
	constructor() {
		super('GlobalContainer Not Initialized');
	}
}
