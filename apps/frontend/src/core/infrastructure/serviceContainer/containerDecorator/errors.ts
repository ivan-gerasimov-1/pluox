import type { TServiceToken } from '@root/core/infrastructure/serviceContainer/types';

export class InvalidProviderConfigurationError extends Error {
	constructor(providerToken: TServiceToken, paramName: string) {
		super(
			`Invalid provider configuration for "${providerToken}": missing ${paramName}`,
		);
	}
}

export class MissingDependencyError extends Error {
	constructor(dependency: TServiceToken, providerToken: TServiceToken) {
		super(`Dependency ${dependency} not found for provider ${providerToken}`);
	}
}

export class MissingImplementationError extends Error {
	constructor(providerToken: TServiceToken) {
		super(
			`Provider ${providerToken} must have either useClass, useFactory, or useValue`,
		);
	}
}

export class MultipleImplementationError extends Error {
	constructor(providerToken: TServiceToken) {
		super(
			`Provider ${providerToken} can only have one of: useClass, useFactory, or useValue`,
		);
	}
}

export class MissingProviderTokenError extends Error {
	constructor() {
		super('Token must be defined');
	}
}

export class NotImplementedError extends Error {
	constructor() {
		super('Not Implemented');
	}
}
