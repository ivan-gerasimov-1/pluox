import {
  $spendings,
  $spendingsSelector,
  ISpendingOperation,
  ISpendingsStore,
} from '@modules/spendings/spendings.store';
import { formatCurrency } from '@root/utils/currency';
import { useSelector } from '@root/utils/store';
import * as React from 'react';

export function SpendingList() {
  let spendingsList = useSelector<ISpendingsStore, ISpendingOperation[]>(
    $spendings,
    $spendingsSelector.list.fn,
    {
      field: $spendingsSelector.list.field,
      defaultValue: [],
    },
  );

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <h1>Spending List</h1>
      </div>

      <ul>
        {spendingsList?.map((item) => {
          return (
            <li key={item.id}>
              {new Date(item.dateCreated).toLocaleString()}
              <br />
              <strong>{formatCurrency(item.amount)}</strong>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
