import { EAppPath } from '@root/presentation/web-ui/appPath';

import { IconLink } from '@root/presentation/web-ui/uiKit/iconLink/iconLink';
import { EIconName } from '@root/presentation/web-ui/uiKit/icon/icons';
import { EIconSize } from '@root/presentation/web-ui/uiKit/icon/iconSize';

import styles from './navbar.module.css';

import { Button } from '@root/presentation/web-ui/uiKit/button/button';
import { useDialog } from '@root/presentation/web-ui/uiKit/dialog/react/dialog/useDialog';
import { ExpenseNew } from '@root/presentation/web-ui/modules/expenses/components/expenseNew/addExpense';

type TNavbarProps = {
	hasMainAction?: boolean;
};

export function Navbar(props: TNavbarProps) {
	let dialog = useDialog();

	return (
		<div className={styles.container}>
			{props.hasMainAction && (
				<Button onClick={() => dialog.render(ExpenseNew)}>Add Expense</Button>
			)}
			<div className={styles.navLinksContainer}>
				<IconLink
					className={styles.navLink}
					to={EAppPath.MAIN}
					iconName={EIconName.Circle}
					iconSize={EIconSize.LARGE}
				/>

				<IconLink
					className={styles.navLink}
					to={EAppPath.EXPENSES}
					iconName={EIconName.Infinite}
					iconSize={EIconSize.LARGE}
				/>

				<IconLink
					className={styles.navLink}
					to={EAppPath.SETTINGS}
					iconName={EIconName.Triangle}
					iconSize={EIconSize.LARGE}
				/>
			</div>
		</div>
	);
}
