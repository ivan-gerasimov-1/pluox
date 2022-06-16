import { Id, TISODateString } from '@root/modules/types';
import { generateId } from '@root/utils/id';
import { withPersist } from '@root/utils/store';
import { createApi, createStore } from 'effector';

export type TSpendingOperation = {
	id: Id;
	/**
	 * @todo
	 * - Use specialized library to store big numbers
	 */
	amount: number;
	dateCreated: TISODateString;
};

type TSpendingOperations = Record<Id, TSpendingOperation>;

type TSpendingCreatePayload = {
	amount: number;
};

export type TSpendingsStore = {
	operations: TSpendingOperations;
};

export let $spendings = withPersist(
	createStore<TSpendingsStore>(
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
		const spendingOperation: TSpendingOperation = {
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
	total: {
		field: 'operations',
		fn(): number {
			let state = $spendings.getState();
			let total = 0;

			for (let operation of Object.values(state.operations)) {
				total += operation.amount;
			}

			return total;
		},
	},
	list: {
		field: 'operations',
		fn(): TSpendingOperation[] {
			let { operations = [] } = $spendings.getState();

			return Object.values(operations);
		},
	},
};
