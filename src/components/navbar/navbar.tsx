import { AddSpending } from '@modules/spendings';
import * as React from 'react';
import styles from './navbar.module.css';

export function Navbar() {
  return (
    <footer className={styles.navbar}>
      <div />

      <AddSpending />

      <div />
    </footer>
  );
}
