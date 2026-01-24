import type { IDisposable } from '@kit/dialog/core/types';

export interface IDialogStore<T extends { id: string }> extends IDisposable {
	add(item: T): T;
	read(id: string): T | undefined;
	update(id: string, payload: Partial<Omit<T, 'id'>>): T | undefined;
	remove(id: string): boolean;

	readonly snapshot: T[];
}
