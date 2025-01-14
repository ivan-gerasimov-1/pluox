import type {
	IContainer,
	IServiceMap,
	IServiceProvider,
	TServiceToken,
} from '@root/core/infrastructure/serviceContainer/types';

export class ContainerDecorator implements IContainer {
	constructor(protected readonly decoratee: IContainer) {}

	public get providers(): Map<TServiceToken, IServiceProvider> {
		return this.decoratee.providers;
	}

	public register(...providers: IServiceProvider[]): IContainer {
		this.decoratee.register(...providers);

		return this;
	}

	public seal(): void {
		this.decoratee.seal();
	}

	public createInstance<T>(provider: IServiceProvider<T>): T {
		return this.decoratee.createInstance(provider);
	}

	public get<T extends TServiceToken = keyof IServiceMap>(
		token: T,
	): IServiceMap[T] {
		return this.decoratee.get(token);
	}

	public disposeInstance(token: TServiceToken): void {
		this.decoratee.disposeInstance(token);
	}

	public disposeAll(): void {
		this.decoratee.disposeAll();
	}
}
