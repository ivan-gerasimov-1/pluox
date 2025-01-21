import { createRoot } from 'react-dom/client';

import type { QueryClient } from '@tanstack/react-query';

import { Root } from '@root/presentation/web-ui/modules/app/components /root/root';
import { AppContainerNotInitializedError } from '@root/presentation/web-ui/errors';

import type { IContainer } from '@root/core/infrastructure/serviceContainer/types';
import type { IUserInterface } from '@root/presentation/shared/types';
import type { IRouter } from '@root/presentation/web-ui/router';
import type { IRoot } from '@root/presentation/web-ui/types';
import type { IUIElement } from '@root/presentation/web-ui/uiElement';
import type { IUILoader } from '@root/presentation/web-ui/uiLoader';

export class ReactUI implements IUserInterface {
	#appContainer?: IRoot;

	constructor(
		private readonly appElement: IUIElement,
		private readonly loader: IUILoader,
		private readonly queryClient: QueryClient,
		private readonly router: IRouter,
		private readonly diContainer: IContainer,
	) {}

	private get appContainer(): IRoot {
		if (!this.#appContainer) {
			throw new AppContainerNotInitializedError();
		}

		return this.#appContainer;
	}

	public async start(): Promise<void> {
		if (!this.#appContainer) {
			this.createAppContainer();
		}

		this.appContainer.render(
			<Root
				queryClient={this.queryClient}
				router={this.router}
				diContainer={this.diContainer}
				onRendered={() => this.loader.hideAndRemove()}
			/>,
		);
	}

	public dispose(): this {
		this.appContainer.unmount();

		return this;
	}

	private createAppContainer(): void {
		let appElement = this.appElement.get();

		this.#appContainer = createRoot(appElement);
	}
}
