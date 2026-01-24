import {
	ContainerNotSealedError,
	ContainerSealedError,
} from '@core/infrastructure/serviceContainer/errors';
import {
	EServiceScope,
	type IContainer,
	type IModule,
	type IServiceMap,
	type IServiceProvider,
	type TServiceToken,
} from '@core/infrastructure/serviceContainer/types';

export class Container implements IContainer {
	readonly #providers = new Map<TServiceToken, IServiceProvider>();

	private readonly instances = new Map<TServiceToken, unknown>();
	private readonly resolutionStack: TServiceToken[] = [];
	private readonly registeredModules = new Set<IModule>();

	private isSealed = false;

	public get providers(): Map<TServiceToken, IServiceProvider> {
		return this.#providers;
	}

	public register(...providers: IServiceProvider[]): IContainer {
		if (this.isSealed) {
			throw new ContainerSealedError();
		}

		providers.forEach((provider) => {
			this.#providers.set(provider.token, provider);
		});

		return this;
	}

	public registerModule(module: IModule): IContainer {
		if (this.isSealed) {
			throw new ContainerSealedError();
		}

		if (this.registeredModules.has(module)) {
			return this;
		}

		module.imports?.forEach((importedModule) => {
			this.registerModule(importedModule);
		});

		this.register(...module.providers);

		this.registeredModules.add(module);

		return this;
	}

	public seal(): IContainer {
		if (this.isSealed) {
			return this;
		}

		this.isSealed = true;

		return this;
	}

	public createInstance<T>(provider: IServiceProvider<T>): T {
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

		const provider = this.#providers.get(token);

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
}
