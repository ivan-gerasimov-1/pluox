import { HTMLElementNotFoundError } from '@root/presentation/web-ui/errors';
import type { IHTMLElement, IDocument } from '@root/presentation/web-ui/types';

export interface IUIElement {
	get(): IHTMLElement;

	dispose(): void;

	addClass(...classList: string[]): void;
	removeClass(...classList: string[]): void;
}

export class UIElement implements IUIElement {
	readonly #id: string;
	#element: IHTMLElement | null;

	#isDisposed: boolean;

	constructor(
		private readonly document: IDocument,
		options: {
			readonly id: string;
		},
	) {
		this.#id = options.id;
		this.#element = null;

		this.#isDisposed = false;
	}

	private get element(): IHTMLElement {
		if (this.#isDisposed) {
			throw new HTMLElementNotFoundError(this.#id);
		}

		if (!this.#element) {
			this.#element = this.createElement();

			if (!this.#element) {
				throw new HTMLElementNotFoundError(this.#id);
			}
		}

		return this.#element;
	}

	public get(): IHTMLElement {
		return this.element;
	}

	public dispose(): void {
		this.element.remove();

		this.#element = null;
		this.#isDisposed = true;
	}

	public addClass(...classList: string[]): void {
		return this.element.classList.add(...classList);
	}

	public removeClass(...classList: string[]): void {
		return this.element.classList.remove(...classList);
	}

	private createElement(): IHTMLElement | null {
		let element = this.document.getElementById(this.#id);

		return element;
	}
}
