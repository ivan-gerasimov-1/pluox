import { useState } from 'react';
import { MoneyCard } from '../money-card/money-card';

export function MoneyLeft() {
	let [balance] = useState<number>(0);

	return <MoneyCard title="Balance" amount={balance} />;
}
