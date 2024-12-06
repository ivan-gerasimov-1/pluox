import {
	type IServiceMap,
	type ServiceProvider,
	type ServiceToken,
	ServiceScope,
} from '@modules/serviceContainer/types';

export class Container {
	private readonly providers = new Map<ServiceToken, ServiceProvider>();
	private readonly instances = new Map<ServiceToken, unknown>();
	private readonly resolutionStack: ServiceToken[] = [];

	private isValidated = false;

	register(...providers: ServiceProvider[]): Container {
		if (this.isValidated) {
			throw new Error(
				'Container is already validated. Cannot register new providers.',
			);
		}

		providers.forEach((provider) => {
			this.providers.set(provider.token, provider);
		});

		return this;
	}

	validate(): void {
		if (this.isValidated) {
			return;
		}

		for (let provider of this.providers.values()) {
			this.validateProvider(provider);
		}

		this.isValidated = true;
	}

	private validateProvider(provider: ServiceProvider): void {
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

	get<T extends ServiceToken = ServiceToken>(token: T): IServiceMap[T] {
		if (!this.isValidated) {
			throw new Error(
				'Container is not validated. Call validate() after registering all providers.',
			);
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

		const scope = provider.scope || ServiceScope.SINGLETON;

		if (scope === ServiceScope.SINGLETON && this.instances.has(token)) {
			return this.instances.get(token) as IServiceMap[T];
		}

		this.resolutionStack.push(token);

		try {
			const instance = this.createInstance(provider);

			if (scope === ServiceScope.SINGLETON) {
				this.instances.set(token, instance);
			}

			return instance as IServiceMap[T];
		} finally {
			this.resolutionStack.pop();
		}
	}

	private createInstance<T>(provider: ServiceProvider<T>): T {
		if (provider.useValue) {
			return provider.useValue as T;
		}

		if (provider.useFactory) {
			const deps = (provider.deps || []).map((dep) => this.get(dep));
			return provider.useFactory(...deps) as T;
		}

		if (provider.useClass) {
			const deps = (provider.deps || []).map((dep) => this.get(dep));
			return new provider.useClass(...deps) as T;
		}

		throw new Error(
			`Invalid provider configuration for ${provider.token.toString()}`,
		);
	}

	clear(token: ServiceToken): void {
		this.instances.delete(token);
	}

	clearAll(): void {
		this.instances.clear();
	}
}

// // core/di/react.tsx
// import { createContext, useContext, ReactNode } from 'react';

// const ContainerContext = createContext<Container | null>(null);

// export function ContainerProvider({
// 		container,
// 		children
// }: {
// 		container: Container;
// 		children: ReactNode;
// }) {
// 		return (
// 				<ContainerContext.Provider value={container}>
// 						{children}
// 				</ContainerContext.Provider>
// 		);
// }

// export function useService<T>(token: ServiceToken<T>): T {
// 		const container = useContext(ContainerContext);
// 		if (!container) {
// 				throw new Error('useService must be used within ContainerProvider');
// 		}
// 		return container.get(token);
// }

// // App.tsx
// export function App() {
// 		const container = new Container();
// 		container.register(appProviders);
// 		container.validate();

// 		return (
// 				<ContainerProvider container={container}>
// 						<Router />
// 				</ContainerProvider>
// 		);
// }
