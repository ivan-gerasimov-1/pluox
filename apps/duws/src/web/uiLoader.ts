import type { IUIElement } from '@/web/uiElement';

import { delay } from '@/web/utils/delay';

export interface IUILoader {
	hide(): void;
	remove(): void;
	hideAndRemove(): Promise<void>;
}

export class UILoader implements IUILoader {
	constructor(private readonly element: IUIElement) {}

	public async hideAndRemove(): Promise<void> {
		await this.delay(350);

		this.hide();

		await this.delay(150);

		this.remove();
	}

	public hide(): void {
		this.element.addClass('hidden');
	}

	public remove(): void {
		this.element.dispose();
	}

	private delay(timeoutMs: number): Promise<void> {
		return delay(timeoutMs);
	}
}
