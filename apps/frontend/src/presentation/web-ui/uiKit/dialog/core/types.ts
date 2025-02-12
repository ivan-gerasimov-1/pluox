export interface IDisposable {
	dispose(): void;
}

export interface IIdGenerator {
	(): string;
}

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
	type: 'sheet' | 'modal';
	status: 'initial' | 'open' | 'closed';

	component: React.FunctionComponent<{
		id: string;
		close: () => void;
	}>;
	props?: {};

	close: () => void;
	remove: () => void;
};
