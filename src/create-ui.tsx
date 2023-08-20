import { App } from '@components/app/app';
import { StrictMode } from 'react';
import { createRoot, type Root } from 'react-dom/client';

interface IWindow extends Window {}
interface IRoot extends Root {}

interface IReactUIConstructorParams {
	containerId: string;
}

export interface IUserInterface {
	mount(): Promise<void>;
	unmount(): IUserInterface;
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

	public async mount(): Promise<void> {
		if (!this.#container) {
			this.create();
		}

		this.root.render(
			<StrictMode>
				<App />
			</StrictMode>,
		);
	}

	public unmount(): this {
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
