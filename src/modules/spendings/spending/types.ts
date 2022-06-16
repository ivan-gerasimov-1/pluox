import type { TSpendingOperation } from '@modules/spendings/spendings.store';
import type { Id } from '@modules/types';

export interface ISpending {
	readonly id: Id;
	toObject(): TSpendingOperation;
}
