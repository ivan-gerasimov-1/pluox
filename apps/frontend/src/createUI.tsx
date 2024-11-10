import { createRoot, type Root } from 'react-dom/client';

import { delay } from '@utils/delay';

import { App } from '@components/app/app';
import type { QueryClient } from '@tanstack/react-query';

interface IWindow extends Window {}
interface IRoot extends Root {}

interface IReactUIConstructorParams {
	containerId: string;
}

export interface IUserInterface {
	render(): Promise<void>;
	dispose(): IUserInterface;
}

export class ReactUI implements IUserInterface {
	#window: IWindow;

	#containerId: string;
	#container?: IRoot;

	constructor(
		window: IWindow,
		private readonly queryClient: QueryClient,
		params: IReactUIConstructorParams,
	) {
		this.#window = window;
		this.#containerId = params.containerId;
	}

	private get root(): IRoot {
		if (!this.#container) {
			throw new Error('Not initialized');
		}

		return this.#container;
	}

	public async render(): Promise<void> {
		if (!this.#container) {
			this.create();
		}

		this.root.render(
			<App
				queryClient={this.queryClient}
				onRendered={async () => {
					let $loader = this.#window.document.getElementById('loader');

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
		const element = this.#window.document.getElementById(id);

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
