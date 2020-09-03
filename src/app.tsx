import { Navbar } from '@components/navbar';
import { $globalState } from '@modules/global-state';
import { AddSpendingScreen, LoadingScreen, MainScreen } from '@screens/index';
import { logGroup } from '@utils/log-group';
import { useStore } from 'effector-react';
import * as React from 'react';
import './app.css';
import styles from './app.module.css';
import './reset.css';

export function useScreen() {
  let globalStateStore = useStore($globalState);
  let [CurrentScreen, setCurrentScreen] = React.useState<any>(LoadingScreen);

  React.useEffect(() => {
    let screen = globalStateStore.isAdd ? AddSpendingScreen : MainScreen;

    logGroup('App:: globalStateStore :: useEffect :: screen', screen.name);

    setCurrentScreen(screen);
  }, [globalStateStore.isAdd]);

  return CurrentScreen;
}

export function App() {
  let CurrentScreen = useScreen();

  return (
    <div className={styles.wrapper}>
      <div className={styles.logoWrapper}>
        <h1 className={styles.logo}>Savee</h1>
      </div>

      <div className={styles.content}>{CurrentScreen}</div>

      <Navbar />
    </div>
  );
}
