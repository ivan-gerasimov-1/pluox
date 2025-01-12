import { IDocument, IWindow } from '@root/presentation/web-ui/types';
import { delay } from '@root/presentation/web-ui/utils/delay';

export interface IUILoader {
	hide(): void;
	remove(): void;
	hideAndRemove(): Promise<void>;
}

export class UILoader implements IUILoader {
	readonly #element: HTMLElement;

	constructor(
		private readonly document: IDocument,
		options: {
			readonly containerId: string;
		},
	) {
		let element = this.document.getElementById(options.containerId);

		if (!element) {
			throw new Error(`Element with id ${options.containerId} not found`);
		}

		this.#element = element;
	}

	public async hideAndRemove(): Promise<void> {
		await this.delay(350);

		this.hide();

		await this.delay(150);

		this.remove();
	}

	public hide(): void {
		this.#element.classList.add('hidden');
	}

	public remove(): void {
		this.#element.remove();
	}

	private async delay(timeoutMs: number): Promise<void> {
		return delay(timeoutMs);
	}
}
