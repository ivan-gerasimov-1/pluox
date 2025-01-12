import { createRoot } from 'react-dom/client';
import type { QueryClient } from '@tanstack/react-query';

import { App } from '@root/presentation/web-ui/components/app/app';
import type { IRouter } from '@root/presentation/web-ui/router';
import type { IUserInterface } from '@root/presentation/shared/types';

import type { IContainer } from '@root/core/infrastructure/serviceContainer/types';
import type { IRoot, IWindow } from '@root/presentation/web-ui/types';
import type { IUILoader } from '@root/presentation/web-ui/uiLoader';

interface IReactUIConstructorParams {
	containerId: string;
}

export class ReactUI implements IUserInterface {
	readonly #containerId: string;
	#container?: IRoot;

	constructor(
		private readonly window: IWindow,
		private readonly loader: IUILoader,
		private readonly queryClient: QueryClient,
		private readonly router: IRouter,
		private readonly diContainer: IContainer,
		params: IReactUIConstructorParams,
	) {
		this.#containerId = params.containerId;
	}

	private get root(): IRoot {
		if (!this.#container) {
			throw new NotInitializedError();
		}

		return this.#container;
	}

	public async start(): Promise<void> {
		if (!this.#container) {
			this.create();
		}

		this.root.render(
			<App
				queryClient={this.queryClient}
				router={this.router}
				diContainer={this.diContainer}
				onRendered={() => this.loader.hideAndRemove()}
			/>,
		);
	}

	public dispose(): this {
		this.root.unmount();

		return this;
	}

	private create(): void {
		const rootElement = this.getRootElement(this.#containerId);

		this.#container = createRoot(rootElement);
	}

	/**
	 * @throws {HTMLElementNotFoundError}
	 */
	private getRootElement(id: string): HTMLElement {
		const element = this.window.document.getElementById(id);

		if (element === null) {
			throw new HTMLElementNotFoundError();
		}

		return element;
	}
}

class HTMLElementNotFoundError extends Error {
	constructor() {
		super('HTMLElement Not Found');
	}
}

class NotInitializedError extends Error {
	constructor() {
		super('Not initialized');
	}
}
