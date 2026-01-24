import type { IContainer } from '@core/infrastructure/serviceContainer/types';
import type { QueryClient } from '@tanstack/react-query';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import type { TDevToolsConfig } from '@/web/devtoolsConfig';
import { AppContainerNotInitializedError } from '@/web/errors';
import { App } from '@/web/modules/app/components/app/app';
import type { IRouter } from '@/web/router';
import type { IRoot, IUserInterface } from '@/web/types';
import type { IUIElement } from '@/web/uiElement';
import type { IUILoader } from '@/web/uiLoader';

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
