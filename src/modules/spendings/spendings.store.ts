import { Spending } from '@modules/spendings/spending';
import { Id, TISODateString } from '@root/modules/types';
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
		const spendingOperation = new Spending(payload.amount);

		return {
			...prevState,
			operations: {
				...prevState.operations,
				[spendingOperation.id]: spendingOperation.toObject(),
			},
		};
	},
});

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
