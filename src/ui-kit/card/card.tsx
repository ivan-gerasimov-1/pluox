import * as React from 'react';
import styles from './card.module.css';
import classnames from 'classnames';

export interface ICard {
  noPadding?: boolean;
}

export function Card(props: React.PropsWithChildren<ICard>) {
  return (
    <div
      className={classnames(styles.card, {
        [styles.noPadding]: props.noPadding,
      })}
    >
      {props.children}
    </div>
  );
}
