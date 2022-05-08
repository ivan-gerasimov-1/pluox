import { AddSpending } from '@modules/spendings';
import styles from './navbar.module.css';
import { Icon } from '@ui-kit/icon';

export function Navbar() {
	return (
		<footer className={styles.navbar}>
			<div />

			<AddSpending />

			<div>
				{/* <button type="button" className={styles.navbarButton}>
          <Icon name={Icon.IconName.Settings} />
        </button> */}
			</div>
		</footer>
	);
}
