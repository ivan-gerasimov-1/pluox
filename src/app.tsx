import { Navbar } from '@components/navbar';
import { AddSpendingScreen, ErrorScreen, MainScreen } from '@screens/index';
import * as React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import styles from './app.module.css';

export function App() {
  return (
    <Router>
      <div className={styles.wrapper}>
        <div className={styles.logoWrapper}>
          <h1 className={styles.logo}>Savee</h1>
        </div>

        <div className={styles.content}>
          <Routes>
            <Route path="/" element={<MainScreen />} />
            <Route path="/add" element={<AddSpendingScreen />} />

            <Route
              path="*"
              element={<ErrorScreen message="Page not found" />}
            />
          </Routes>
        </div>

        <Navbar />
      </div>
    </Router>
  );
}
