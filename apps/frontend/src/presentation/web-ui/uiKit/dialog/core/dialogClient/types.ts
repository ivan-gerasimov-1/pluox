import type {
	IDisposable,
	TDialog,
	TDialogComponent,
	TDialogProps,
} from '@root/presentation/web-ui/uiKit/dialog/core/types';

export interface IDialogClient extends IDisposable {
	create<TProps extends {}, TClosePayload extends {} = never>(
		component: TDialogComponent<TProps, TClosePayload>,
		props: TDialogProps<TProps>,
	): TDialog<TProps>;
	remove(id: string): void;
	open(id: string): void;
	close(id: string): void;

	getSnapshot(): TDialog[];

	subscribe(listener: () => void): () => void;
}
