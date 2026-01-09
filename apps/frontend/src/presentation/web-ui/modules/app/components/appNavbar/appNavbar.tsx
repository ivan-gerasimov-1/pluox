import { EAppPath } from '@root/presentation/web-ui/appPath';
import { appNavbarI18n } from '@root/presentation/web-ui/modules/app/components/appNavbar/appNavbar.i18n';
import { ExpenseNew } from '@root/presentation/web-ui/modules/expenses/components/expenseNew/addExpense';
import { useIntl } from '@root/presentation/web-ui/modules/intl/useIntl/useIntl';
import { Button } from '@root/presentation/web-ui/uiKit/button/button';
import { useDialog } from '@root/presentation/web-ui/uiKit/dialog/react/dialog/useDialog';
import { EIconName } from '@root/presentation/web-ui/uiKit/icon/icons';
import { EIconSize } from '@root/presentation/web-ui/uiKit/icon/iconSize';
import { IconLink } from '@root/presentation/web-ui/uiKit/iconLink/iconLink';
import { Navbar } from '@root/presentation/web-ui/uiKit/navbar/navbar';
import { cls } from '@root/presentation/web-ui/utils/classnames';

type TAppNavbarProps = {
	hasMainAction?: boolean;
};

export function AppNavbar(props: TAppNavbarProps) {
	let intl = useIntl(appNavbarI18n);
	let dialog = useDialog();

	return (
		<Navbar>
			{props.hasMainAction && (
				<Button onClick={() => dialog.render(ExpenseNew)}>
					{intl.translate('addExpense')}
				</Button>
			)}

			<div
				className={cls(
					'flex justify-between',
					'*:p-5 *:text-neutral-600 *:[.active]:text-neutral-900 *:transition-colors',
				)}
			>
				<IconLink
					className="-ml-2.5"
					to={EAppPath.DASHBOARD}
					iconName={EIconName.Circle}
					iconSize={EIconSize.LARGE}
				/>

				<IconLink
					to={EAppPath.EXPENSES}
					iconName={EIconName.Infinite}
					iconSize={EIconSize.LARGE}
				/>

				<IconLink
					className="-mr-2.5"
					to={EAppPath.SETTINGS}
					iconName={EIconName.Triangle}
					iconSize={EIconSize.LARGE}
				/>
			</div>
		</Navbar>
	);
}
