import { $globalStateApi } from '@modules/global-state';
import { generateId } from '@utils/id';
import { createApi, createStore } from 'effector';
import * as React from 'react';
import { $spendingApi } from '../spendings.store';
import styles from './new-spending.module.css';

interface IFormStore {
  amount: number;
}

let $form = createStore<IFormStore>({
  amount: 0,
});

let $formApi = createApi($form, {
  setAmount(prevState, amount: number) {
    return {
      ...prevState,
      amount,
    };
  },
});

export function NewSpending() {
  let submitHandler = React.useCallback((event) => {
    event.preventDefault();

    let { amount } = $form.getState();

    if (!amount || amount === 0) {
      return;
    }

    $spendingApi.create({
      id: generateId(),
      amount: $form.getState().amount,
    });

    $globalStateApi.setAdd(false);
  }, []);

  let amountChangeHandler = React.useCallback((event) => {
    let value = Number.parseFloat(event.target.value);

    $formApi.setAmount(value);
  }, []);

  return (
    <div style={{ margin: '1rem' }}>
      <form name="newSpending" onSubmit={submitHandler}>
        <input
          id="amount"
          name="amount"
          type="number"
          className={styles.textInput}
          onChange={amountChangeHandler}
          step="0.01"
          min={0}
          required
          autoFocus
        />

        <button className={styles.submitButton} type="submit">
          OK
        </button>
      </form>
    </div>
  );
}
