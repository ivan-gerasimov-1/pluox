import * as React from 'react';
import styles from './money-card.module.css';

export interface IMoneyCard {
  title: string;
  amount?: number;
}

export function MoneyCard(props: IMoneyCard) {
  return (
    <>
      <h2 className={styles.title}>{props.title}</h2>

      <div className={styles.amount}>
        {props.amount
          ? `₽${Number.prototype.toLocaleString.call(props.amount)}`
          : '—'}
      </div>
    </>
  );
}
