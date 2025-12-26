import { EAppPath } from '@root/presentation/web-ui/appPath';
import { navbarI18n } from '@root/presentation/web-ui/modules/app/components/navbar/navbar.i18n';
import { ExpenseNew } from '@root/presentation/web-ui/modules/expenses/components/expenseNew/addExpense';
import { useIntl } from '@root/presentation/web-ui/modules/intl/useIntl/useIntl';
import { Button } from '@root/presentation/web-ui/uiKit/button/button';
import { useDialog } from '@root/presentation/web-ui/uiKit/dialog/react/dialog/useDialog';
import { EIconName } from '@root/presentation/web-ui/uiKit/icon/icons';
import { EIconSize } from '@root/presentation/web-ui/uiKit/icon/iconSize';
import { IconLink } from '@root/presentation/web-ui/uiKit/iconLink/iconLink';
import { cls } from '@root/presentation/web-ui/utils/classnames';

import styles from './navbar.module.css';

type TNavbarProps = {
	hasMainAction?: boolean;
};

export function Navbar(props: TNavbarProps) {
	let intl = useIntl(navbarI18n);
	let dialog = useDialog();

	return (
		<div className={styles.container}>
			{props.hasMainAction && (
				<Button onClick={() => dialog.render(ExpenseNew)}>
					{intl.translate('addExpense')}
				</Button>
			)}
			<div className="flex justify-between">
				<IconLink
					className={cls('p-5', styles.navLink)}
					to={EAppPath.MAIN}
					iconName={EIconName.Circle}
					iconSize={EIconSize.LARGE}
				/>

				<IconLink
					className={cls('p-5', styles.navLink)}
					to={EAppPath.EXPENSES}
					iconName={EIconName.Infinite}
					iconSize={EIconSize.LARGE}
				/>

				<IconLink
					className={cls('p-5', styles.navLink)}
					to={EAppPath.SETTINGS}
					iconName={EIconName.Triangle}
					iconSize={EIconSize.LARGE}
				/>
			</div>
		</div>
	);
}
