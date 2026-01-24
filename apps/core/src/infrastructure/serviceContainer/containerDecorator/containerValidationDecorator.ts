import { ContainerDecorator } from '@core/infrastructure/serviceContainer/containerDecorator/containerDecorator';
import {
	InvalidProviderConfigurationError,
	MissingDependencyError,
	MissingImplementationError,
	MissingProviderTokenError,
	MultipleImplementationError,
	NotImplementedError,
} from '@core/infrastructure/serviceContainer/containerDecorator/errors';
import type {
	IContainer,
	IServiceProvider,
} from '@core/infrastructure/serviceContainer/types';

/**
 * @todo
 * 1. Implement useFactory validation
 * 2. Compare dependency name with param name
 */
export class ContainerValidationDecorator extends ContainerDecorator {
	public override seal(): IContainer {
		this.validate();

		return super.seal();
	}

	private validate(): void {
		for (let provider of this.providers.values()) {
			this.validateToken(provider);

			this.validateImplementationCount(provider);

			this.validateDependencies(provider);

			if (provider.useClass) {
				this.validateClassProvider(provider);
			}

			/** @todo LV-103 */
			// if (provider.useFactory) {
			// 	this.validateFactoryProvider(provider);
			// }
		}
	}

	private validateToken(provider: IServiceProvider): void {
		if (!provider.token) {
			throw new MissingProviderTokenError();
		}
	}

	private validateDependencies(provider: IServiceProvider): void {
		if (!provider.deps) {
			return;
		}

		provider.deps.forEach((dependency) => {
			if (!this.providers.has(dependency)) {
				throw new MissingDependencyError(dependency, provider.token);
			}
		});
	}

	private validateImplementationCount(provider: IServiceProvider): void {
		let implementationCount = [
			provider.useClass,
			provider.useFactory,
			provider.useValue,
		].filter(Boolean).length;

		if (implementationCount === 0) {
			throw new MissingImplementationError(provider.token);
		}

		if (implementationCount > 1) {
			throw new MultipleImplementationError(provider.token);
		}
	}

	private validateClassProvider(provider: IServiceProvider) {
		if (!provider.useClass) {
			return;
		}

		const paramNames =
			provider.useClass
				.toString()
				.match(/constructor\s*\(([^)]*)\)/u)?.[1]
				?.split(',')
				.map((param) => param.trim())
				.filter(Boolean) ?? [];

		let deps = provider.deps ?? [];
		let instance = new provider.useClass(...deps);

		/** @todo №2 */
		for (let paramName of paramNames) {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			if (!(instance as any)[paramName]) {
				throw new InvalidProviderConfigurationError(provider.token, paramName);
			}
		}
	}

	private validateFactoryProvider(): void {
		throw new NotImplementedError();
	}
}
