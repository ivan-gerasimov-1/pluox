import { StrictMode } from 'react';
import { createRoot, type Root } from 'react-dom/client';

import { App } from '@components/app/app';

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

	constructor(window: IWindow, params: IReactUIConstructorParams) {
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
			<StrictMode>
				<App
					onRendered={() => {
						let $loader = this.#window.document.getElementById('loader');

						this.#window.setTimeout(() => {
							$loader?.classList.add('hidded');
						}, 1500);
					}}
				/>
			</StrictMode>,
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
