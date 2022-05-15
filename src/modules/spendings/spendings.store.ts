import { Id } from '@root/modules/types';
import { generateId } from '@root/utils/id';
import { withPersist } from '@root/utils/store';
import { createApi, createStore } from 'effector';

type ISODateString = string;

export interface ISpendingOperation {
	id: Id;
	/**
	 * @todo
	 * - Use specialized library to store big numbers
	 */
	amount: number;
	dateCreated: ISODateString;
}

interface ISpendingOperations {
	[id: string]: ISpendingOperation;
}

type TSpendingCreatePayload = {
	amount: number;
};

export interface ISpendingsStore {
	operations: ISpendingOperations;
}

export let $spendings = withPersist(
	createStore<ISpendingsStore>(
		{
			operations: {},
		},
		{
			name: '$spendings',
		}
	)
);

export let $spendingApi = createApi($spendings, {
	create(prevState, payload: TSpendingCreatePayload) {
		const spendingOperation: ISpendingOperation = {
			id: generateId(),
			amount: payload.amount,
			dateCreated: new Date().toISOString(),
		};

		return {
			...prevState,
			operations: {
				...prevState.operations,
				[spendingOperation.id]: spendingOperation,
			},
		};
	},
});

export function totalSelector(): number {
	let { operations } = $spendings.getState();
	let total = 0;

	for (let operation of Object.values(operations)) {
		total += operation.amount;
	}

	return total;
}

export let $spendingsSelector = {
	list: {
		field: 'operations',
		fn() {
			let { operations = [] } = $spendings.getState();

			return Object.values(operations);
		},
	},
};
