export type TDialogProps<P> = P & {
	id: string;
	close: () => void;
};

export interface IDialogPublicApi {
	id: string;
	close: () => void;
}

export type TDialog = {
	id: string;
	type: 'sheet' | 'modal';

	component: React.FunctionComponent<{
		id: string;
		close: () => void;
	}>;
	props?: {};

	close: () => void;
	unmount: () => void;

	isOpen: boolean;
};
