import { $globalStateApi } from '@modules/global-state';
import { Icon } from '@ui-kit/icon';
import * as React from 'react';
import styles from './add-spending.module.css';

export function AddSpending() {
  let setAdd = React.useCallback(() => {
    $globalStateApi.setAdd(true);
  }, []);

  return (
    <div className={styles.wrapper}>
      <button className={styles.action} type="button" onClick={setAdd}>
        <span className={styles.iconWrapper}>
          <Icon name={Icon.IconName.Add} />
        </span>
      </button>
    </div>
  );
}
