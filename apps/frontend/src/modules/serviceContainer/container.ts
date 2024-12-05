import type {
	IServiceMap,
	ServiceProvider,
	ServiceToken,
} from '@modules/serviceContainer/types';

export class Container {
	private readonly providers = new Map<ServiceToken, ServiceProvider>();
	private readonly instances = new Map<ServiceToken, unknown>();

	register(...providers: ServiceProvider[]): void {
		providers.forEach((provider) => {
			console.log('register', provider.token);
			this.providers.set(provider.token, provider);
		});
	}

	get<T extends ServiceToken = ServiceToken>(token: T): IServiceMap[T] {
		if (this.instances.has(token)) {
			return this.instances.get(token) as IServiceMap[T];
		}

		const provider = this.providers.get(token);

		if (!provider) {
			throw new Error(`No provider registered for token: ${token.toString()}`);
		}

		let instance: T;

		if (provider.useValue) {
			instance = provider.useValue as T;
		} else if (provider.useFactory) {
			const deps = (provider.deps || []).map((dep) => this.get(dep));
			instance = provider.useFactory(...deps) as T;
		} else if (provider.useClass) {
			const deps = (provider.deps || []).map((dep) => this.get(dep));
			instance = new provider.useClass(...deps) as T;
		} else {
			throw new Error(`Invalid provider configuration for ${token.toString()}`);
		}

		this.instances.set(token, instance);

		return instance as unknown as IServiceMap[T];
	}

	clear(token: ServiceToken): void {
		this.instances.delete(token);
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

// // Пример регистрации сервисов:
// // core/di/providers.ts
// export const appProviders: ServiceProvider[] = [
// 		{
// 				token: SERVICE_TOKENS.APP_CONFIG,
// 				useClass: AppConfig
// 		},
// 		{
// 				token: SERVICE_TOKENS.AUTH_SERVICE,
// 				useClass: AuthService,
// 				deps: [SERVICE_TOKENS.STORAGE, SERVICE_TOKENS.APP_CONFIG]
// 		},
// 		{
// 				token: SERVICE_TOKENS.EXPENSES_SERVICE,
// 				useFactory: (storage: ExpensesStorage, converter: CurrencyConverter) => {
// 						return new ExpensesService(storage, converter);
// 				},
// 				deps: [SERVICE_TOKENS.STORAGE, SERVICE_TOKENS.CURRENCY_CONVERTER]
// 		},
// 		{
// 				token: SERVICE_TOKENS.INTL_SERVICE,
// 				useFactory: (config: AppConfig) => {
// 						return new IntlService(config.locale);
// 				},
// 				deps: [SERVICE_TOKENS.APP_CONFIG]
// 		}
// ];

// // Пример использования в компонентах:
// // components/ExpenseList.tsx
// export function ExpenseList() {
// 		const expensesService = useService(SERVICE_TOKENS.EXPENSES_SERVICE);
// 		const intlService = useService(SERVICE_TOKENS.INTL_SERVICE);

// 		// ... логика компонента
// }

// // App.tsx
// export function App() {
// 		const container = new Container();
// 		container.register(appProviders);

// 		return (
// 				<ContainerProvider container={container}>
// 						<Router />
// 				</ContainerProvider>
// 		);
// }
