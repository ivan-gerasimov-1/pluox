import type { IDisposable } from '@root/presentation/web-ui/uiKit/dialog/core/types';

export type TObserver = () => void;

export interface IDialogObserver extends IDisposable {
	subscribe(observer: TObserver): () => void;
	notify(): void;
}
