import { $globalStateApi } from '@modules/global-state';
import * as React from 'react';
import styles from './add-spending.module.css';

export function AddSpending() {
  let setAdd = React.useCallback(() => {
    $globalStateApi.setAdd();
  }, []);

  return (
    <button className={styles.action} type="button" onClick={setAdd}>
      +
    </button>
  );
}
