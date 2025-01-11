import { ContainerDecorator } from '@root/core/infrastructure/serviceContainer/containerDecorator/containerDecorator';
import {
	InvalidProviderConfigurationError,
	MissingDependencyError,
	MissingImplementationError,
	MissingProviderTokenError,
	MultipleImplementationError,
	NotImplementedError,
} from '@root/core/infrastructure/serviceContainer/containerDecorator/errors';
import type { IServiceProvider } from '@root/core/infrastructure/serviceContainer/types';

/**
 * @todo
 * 1. Implement useFactory validation
 * 2. Compare dependency name with param name
 */
export class ContainerValidationDecorator extends ContainerDecorator {
	public override seal(): void {
		this.validate();

		super.seal();
	}

	private validate(): void {
		for (let provider of this.providers.values()) {
			this.validateToken(provider);

			this.validateImplementationCount(provider);

			this.validateDependencies(provider);

			if (provider.useClass) {
				this.validateClassProvider(provider);
			}

			/** @todo №1 */
			if (provider.useFactory && false) {
				this.validateFactoryProvider(provider);
			}
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
				.match(/constructor\s*\(([^)]*)\)/)?.[1]
				?.split(',')
				.map((param) => param.trim())
				.filter(Boolean) ?? [];

		let deps = provider.deps ?? [];
		let instance = new provider.useClass(...deps);

		/** @todo №2 */
		for (let paramName of paramNames) {
			if (!(instance as any)[paramName]) {
				throw new InvalidProviderConfigurationError(provider.token, paramName);
			}
		}
	}

	private validateFactoryProvider(provider: IServiceProvider): void {
		throw new NotImplementedError();
	}
}
