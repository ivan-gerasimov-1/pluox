import { Container } from '@pluox/core/src/infrastructure/serviceContainer/container';
import { ContainerValidationDecorator } from '@pluox/core/src/infrastructure/serviceContainer/containerDecorator/containerValidationDecorator';
import type { IContainer } from '@pluox/core/src/infrastructure/serviceContainer/types';

export let globalContainer: IContainer;

export function containerFactory(options?: {
	isGlobal?: boolean;
	isDevelopment?: boolean;
}) {
	let container: IContainer = new Container();

	if (options?.isDevelopment) {
		container = new ContainerValidationDecorator(container);
	}

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
