import type { IDisposable } from '@root/presentation/web-ui/uiKit/dialog/core/types';

export interface IDialogStore<T extends { id: string }> extends IDisposable {
	add(item: T): T;
	read(id: string): T | undefined;
	remove(id: string): boolean;

	readonly snapshot: T[];
}
