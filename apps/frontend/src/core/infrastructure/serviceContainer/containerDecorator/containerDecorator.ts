import {
	IContainer,
	IServiceMap,
	ServiceProvider,
	TServiceToken,
} from '@root/core/infrastructure/serviceContainer/types';

export class ContainerDecorator implements IContainer {
	constructor(private readonly decoratee: IContainer) {}

	public register(...providers: ServiceProvider[]): IContainer {
		return this.decoratee.register(...providers);
	}

	public seal(): void {
		this.decoratee.seal();
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
