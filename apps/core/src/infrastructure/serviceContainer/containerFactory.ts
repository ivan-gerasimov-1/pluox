import { Container } from '@core/infrastructure/serviceContainer/container';
import { ContainerValidationDecorator } from '@core/infrastructure/serviceContainer/containerDecorator/containerValidationDecorator';
import type { IContainer } from '@core/infrastructure/serviceContainer/types';

let globalContainer: IContainer | undefined;

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

export function resetGlobalContainer(): void {
	if (!globalContainer) {
		throw new GlobalContainerNotInitializedError();
	}

	globalContainer.disposeAll();
	globalContainer = undefined;
}

export class GlobalContainerNotInitializedError extends Error {
	constructor() {
		super('GlobalContainer Not Initialized');
	}
}
