import { Id } from '@root/utils/id';
import { withPersist } from '@root/utils/store';
import { createApi, createStore, sample } from 'effector';

export interface ISpendingOperation {
  id: Id;
  /**
   * @todo
   * - Use specialized library to store big numbers
   */
  amount: number;
}

interface ISpendingOperations {
  [id: string]: ISpendingOperation;
}

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
    },
  ),
);

export let $spendingApi = createApi($spendings, {
  create(prevState, spendingOperation: ISpendingOperation) {
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
