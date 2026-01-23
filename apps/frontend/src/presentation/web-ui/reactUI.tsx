import type { IUserInterface } from '@/presentation/types';
import type { QueryClient } from '@tanstack/react-query';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import type { IContainer } from '@/core/infrastructure/serviceContainer/types';

import type { TDevToolsConfig } from '@/presentation/web-ui/devtoolsConfig';
import { AppContainerNotInitializedError } from '@/presentation/web-ui/errors';
import { App } from '@/presentation/web-ui/modules/app/components/app/app';
import type { IRouter } from '@/presentation/web-ui/router';
import type { IRoot } from '@/presentation/web-ui/types';
import type { IUIElement } from '@/presentation/web-ui/uiElement';
import type { IUILoader } from '@/presentation/web-ui/uiLoader';

export class ReactUI implements IUserInterface {
	#appContainer?: IRoot;

	constructor(
		private readonly appElement: IUIElement,
		private readonly loader: IUILoader,
		private readonly queryClient: QueryClient,
		private readonly router: IRouter,
		private readonly devtoolsConfig: TDevToolsConfig,
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
			<StrictMode>
				<App
					queryClient={this.queryClient}
					router={this.router}
					diContainer={this.diContainer}
					devtoolsConfig={this.devtoolsConfig}
					onRendered={() => this.loader.hideAndRemove()}
				/>
			</StrictMode>,
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
