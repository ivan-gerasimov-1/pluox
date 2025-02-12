export interface IDisposable {
	dispose(): void;
}

export interface IIdGenerator {
	(): string;
}

export type TDialogType = 'sheet' | 'modal';
export type TDialogStatus = 'initial' | 'open' | 'closed';

export type TDialogProps<P> = P & {
	id: string;
	close: () => void;
};

export interface IDialogApi {
	id: string;
	close: () => void;
}

export type TDialog = {
	id: string;
	type: TDialogType;
	status: TDialogStatus;

	component: React.FunctionComponent<{
		id: string;
		close: () => void;
	}>;
	props?: {};

	close: () => void;
	remove: () => void;
};
