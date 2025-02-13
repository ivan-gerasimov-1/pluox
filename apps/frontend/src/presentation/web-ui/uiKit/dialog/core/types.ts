export interface IDisposable {
	dispose(): void;
}

export interface IIdGenerator {
	(): string;
}

export type TDialogType = 'sheet' | 'modal';
export type TDialogStatus = 'initial' | 'open' | 'closed';

export interface IDialogApi {
	id: string;
	close: () => void;
}

export type TDialogComponent<
	TProps,
	TClosePayload = never,
> = React.FunctionComponent<TDialogComponentProps<TProps, TClosePayload>>;

export type TDialogComponentProps<TProps = {}, TClosePayload = void> = {
	id: string;
	close: TClosePayload extends void
		? () => void
		: (payload: TClosePayload) => void;
} & TProps;

export type TDialogProps<TProps = {}, TClosePayload = void> = Omit<
	TDialogComponentProps<TProps, TClosePayload>,
	'id' | 'close'
> &
	Partial<Pick<TDialogComponentProps<TProps, TClosePayload>, 'close'>>;

export type TDialog<TProps = {}, TClosePayload = void> = {
	id: string;
	type: TDialogType;
	status: TDialogStatus;

	component: TDialogComponent<TProps, TClosePayload>;
	props: TDialogProps<TProps, TClosePayload> | null;

	close: () => void;
	remove: () => void;
};
