import {
  $spendings,
  ISpendingsStore,
  totalSelector,
} from '@modules/spendings/spendings.store';
import { useSelector } from '@root/utils/store';
import { MoneyCard } from '../money-card/money-card';

export function MoneySpent() {
  let total = useSelector<ISpendingsStore, number>($spendings, totalSelector, {
    field: 'operations',
    defaultValue: 0,
  });

  return <MoneyCard title="Outcome" amount={total} />;
}
