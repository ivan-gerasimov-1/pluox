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
	TProps extends {},
	TClosePayload extends {} = never,
> = React.FunctionComponent<TDialogComponentProps<TProps, TClosePayload>>;

export type TDialogComponentProps<
	TProps extends {} = {},
	TClosePayload extends {} = never,
> = {
	id: string;
	close: (payload: TClosePayload) => void;
} & TProps;

export type TDialogProps<
	TProps extends {} = {},
	TClosePayload extends {} = never,
> = Omit<TDialogComponentProps<TProps, TClosePayload>, 'id' | 'close'> &
	Partial<Pick<TDialogComponentProps<TProps, TClosePayload>, 'close'>>;

export type TDialog<TProps extends {} = {}> = {
	id: string;
	type: TDialogType;
	status: TDialogStatus;

	component: TDialogComponent<TProps>;
	props: TDialogProps<TProps>;

	close: () => void;
	remove: () => void;
};
