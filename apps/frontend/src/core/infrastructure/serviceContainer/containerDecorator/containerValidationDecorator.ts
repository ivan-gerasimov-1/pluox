import { ContainerDecorator } from '@root/core/infrastructure/serviceContainer/containerDecorator/containerDecorator';
import type { IServiceProvider } from '@root/core/infrastructure/serviceContainer/types';

export class ContainerValidationDecorator extends ContainerDecorator {
	public override seal(): void {
		this.validate();

		super.seal();
	}

	private validate(): void {
		for (let provider of this.providers.values()) {
			this.validateProvider(provider);
		}
	}

	private validateProvider(provider: IServiceProvider): void {
		if (!provider.token) {
			throw new Error('Provider must have a token');
		}

		const implementationCount = [
			provider.useClass,
			provider.useFactory,
			provider.useValue,
		].filter(Boolean).length;

		if (implementationCount === 0) {
			throw new Error(
				`Provider ${provider.token.toString()} must have either useClass, useFactory, or useValue`,
			);
		}

		if (implementationCount > 1) {
			throw new Error(
				`Provider ${provider.token.toString()} can only have one of: useClass, useFactory, or useValue`,
			);
		}

		if (provider.deps) {
			provider.deps.forEach((dep) => {
				if (!this.providers.has(dep)) {
					throw new Error(
						`Dependency ${dep.toString()} not found for provider ${provider.token.toString()}`,
					);
				}
			});
		}
	}
}
