import { createRoot, type Root } from 'react-dom/client';
import type { QueryClient } from '@tanstack/react-query';

import { delay } from '@root/presentation/web-ui/utils/delay';
import { App } from '@root/presentation/web-ui/components/app/app';
import type { IRouter } from '@root/presentation/web-ui/router';
import type { IUserInterface } from '@root/presentation/shared/types';

import type { IContainer } from '@modules/serviceContainer/types';

interface IWindow extends Window {}
interface IRoot extends Root {}

interface IReactUIConstructorParams {
	containerId: string;
}

export class ReactUI implements IUserInterface {
	#containerId: string;
	#container?: IRoot;

	constructor(
		private readonly window: IWindow,
		private readonly queryClient: QueryClient,
		private readonly router: IRouter,
		private readonly diContainer: IContainer,
		params: IReactUIConstructorParams,
	) {
		this.#containerId = params.containerId;
	}

	private get root(): IRoot {
		if (!this.#container) {
			throw new Error('Not initialized');
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
				onRendered={async () => {
					let $loader = this.window.document.getElementById('loader');

					await delay(350);

					$loader?.classList.add('hidden');

					await delay(150);

					$loader?.remove();
				}}
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
