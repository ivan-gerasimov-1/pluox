import * as React from 'react';
import { MoneyCard } from '../money-card/money-card';

export function MoneyLeft() {
  let [balance] = React.useState<number>(0);

  return <MoneyCard title="Balance" amount={balance} />;
}
