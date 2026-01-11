import type {
	IDisposable,
	TDialog,
	TDialogComponent,
	TDialogProps,
} from '@/presentation/web-ui/uiKit/dialog/core/types';

export interface IDialogClient extends IDisposable {
	create<TProps, TClosePayload>(
		component: TDialogComponent<TProps, TClosePayload>,
		props?: TDialogProps<TProps, TClosePayload>,
	): TDialog<TProps, TClosePayload>;
	remove(id: string): void;
	open(id: string): void;
	close(id: string): void;

	getSnapshot(): TDialog[];

	subscribe(listener: () => void): () => void;
}
