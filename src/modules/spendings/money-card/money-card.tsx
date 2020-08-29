import * as React from 'react';
import styles from './money-card.module.css';

export interface IMoneyCard {
  title: string;
  amount?: number;
}

export function MoneyCard(props: IMoneyCard) {
  return (
    <>
      <h3 className={styles.title}>{props.title}</h3>

      <div className={styles.amount}>₽{props.amount?.toFixed(2) || '—'}</div>
    </>
  );
}
