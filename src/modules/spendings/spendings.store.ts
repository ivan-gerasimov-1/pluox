import { Spending } from '@modules/spendings/spending';
import { TSpending } from '@modules/spendings/spending/types';
import type { TSpendings } from '@modules/spendings/spendings';
import { Spendings } from '@modules/spendings/spendings';
import { withPersist } from '@root/utils/store';
import { createApi, createStore } from 'effector';

type TSpendingCreatePayload = {
	amount: number;
};

export type TSpendingsStore = {
	operations: TSpendings;
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
		const spending = new Spending(payload.amount);
		const spendings = new Spendings(prevState.operations);

		spendings.add(spending);

		return {
			...prevState,
			operations: spendings.getAll(),
		};
	},
});

export let $spendingsSelector = {
	total: {
		field: 'operations',
		fn(): number {
			let state = $spendings.getState();
			let spending = new Spendings(state.operations);

			return spending.getTotalAmount();
		},
	},
	list: {
		field: 'operations',
		fn(): TSpending[] {
			let state = $spendings.getState();
			let spendings = new Spendings(state.operations);

			return spendings.list();
		},
	},
};
