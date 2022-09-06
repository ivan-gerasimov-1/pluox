import { App } from '@components/app/app';
import { StrictMode } from 'react';
import { createRoot, type Root } from 'react-dom/client';

interface IWindow extends Window {}

export interface IUserInterface {
	mount(): Promise<void>;
	unmount(): void;
}

export class ReactUI implements IUserInterface {
	#window: IWindow;

	#containerId: string;
	#container?: Root;

	constructor(window: IWindow, params: { containerId: string }) {
		this.#window = window;
		this.#containerId = params.containerId;
	}

	private get root(): Root {
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
			</StrictMode>
		);
	}

	public unmount(): void {
		this.root.unmount();
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
