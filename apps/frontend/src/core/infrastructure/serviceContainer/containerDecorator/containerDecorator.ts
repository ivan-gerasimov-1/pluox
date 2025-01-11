import {
	IContainer,
	IServiceMap,
	IServiceProvider,
	TServiceToken,
} from '@root/core/infrastructure/serviceContainer/types';

export class ContainerDecorator implements IContainer {
	constructor(private readonly decoratee: IContainer) {}

	public register(...providers: IServiceProvider[]): IContainer {
		this.decoratee.register(...providers);

		return this;
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
