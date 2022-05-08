import { generateId } from '@utils/id';
import { createApi, createStore } from 'effector';
import * as React from 'react';
import { useNavigate } from 'react-router';
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
  let navigate = useNavigate();

  let submitHandler = React.useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let { amount } = $form.getState();

    if (!amount || amount === 0) {
      return;
    }

    $spendingApi.create({
      id: generateId(),
      amount: $form.getState().amount,
      dateCreated: new Date().toISOString(),
    });

    navigate('/');
  }, []);

  let amountChangeHandler = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
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
