import { Icon } from '@ui-kit/icon';
import * as React from 'react';
import { Link } from 'react-router-dom';
import styles from './add-spending.module.css';

export function AddSpending() {
  return (
    <div className={styles.wrapper}>
      <Link className={styles.action} to="/add" title="Add spending">
        <span className={styles.iconWrapper}>
          <Icon name={Icon.IconName.Add} />
        </span>
      </Link>
    </div>
  );
}
