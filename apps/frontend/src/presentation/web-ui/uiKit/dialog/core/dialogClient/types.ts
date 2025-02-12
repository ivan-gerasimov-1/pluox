import type { IDisposable } from '@root/presentation/web-ui/uiKit/dialog/core/types';
import type { TDialog } from '@root/presentation/web-ui/uiKit/dialog/core/types';

export interface IDialogClient extends IDisposable {
	create(component: TDialog['component'], props?: TDialog['props']): TDialog;
	remove(id: string): void;
	open(id: string): void;
	close(id: string): void;

	getSnapshot(): TDialog[];

	subscribe(listener: () => void): () => void;
}
