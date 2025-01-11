import {
	type IContainer,
	type IServiceMap,
	type IServiceProvider,
	EServiceScope,
	type TServiceToken,
} from '@root/core/infrastructure/serviceContainer/types';

export class Container implements IContainer {
	private readonly providers = new Map<TServiceToken, IServiceProvider>();
	private readonly instances = new Map<TServiceToken, unknown>();
	private readonly resolutionStack: TServiceToken[] = [];

	private isSealed = false;

	public register(...providers: IServiceProvider[]): IContainer {
		if (this.isSealed) {
			throw new ContainerSealedError();
		}

		providers.forEach((provider) => {
			this.providers.set(provider.token, provider);
		});

		return this;
	}

	public seal(): void {
		if (this.isSealed) {
			return;
		}

		for (let provider of this.providers.values()) {
			this.validateProvider(provider);
		}

		this.isSealed = true;
	}

	public get<T extends TServiceToken = TServiceToken>(
		token: T,
	): IServiceMap[T] {
		if (!this.isSealed) {
			throw new ContainerNotSealedError();
		}

		if (this.resolutionStack.includes(token)) {
			throw new Error(
				`Circular dependency detected: ${[...this.resolutionStack, token].join(
					' -> ',
				)}`,
			);
		}

		const provider = this.providers.get(token);

		if (!provider) {
			throw new Error(`No provider registered for token: ${token.toString()}`);
		}

		const scope = provider.scope || EServiceScope.SINGLETON;

		if (scope === EServiceScope.SINGLETON && this.instances.has(token)) {
			return this.instances.get(token) as IServiceMap[T];
		}

		this.resolutionStack.push(token);

		try {
			const instance = this.createInstance(provider);

			if (scope === EServiceScope.SINGLETON) {
				this.instances.set(token, instance);
			}

			return instance as IServiceMap[T];
		} finally {
			this.resolutionStack.pop();
		}
	}

	/**
	 * @todo
	 * 1. Call dispose on instance if exists
	 */
	public disposeInstance(token: TServiceToken): void {
		this.instances.delete(token);
	}

	/**
	 * @todo
	 * 1. Call dispose on instance if exists
	 */
	public disposeAll(): void {
		this.instances.clear();
	}

	private createInstance<T>(provider: IServiceProvider<T>): T {
		if (provider.useValue) {
			return provider.useValue as T;
		}

		if (provider.useFactory) {
			let deps = (provider.deps || []).map((dep) => this.get(dep));
			return provider.useFactory(...deps) as T;
		}

		if (provider.useClass) {
			let deps = (provider.deps || []).map((dep) => this.get(dep));
			return new provider.useClass(...deps) as T;
		}

		throw new Error(
			`Invalid provider configuration for ${provider.token.toString()}`,
		);
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
