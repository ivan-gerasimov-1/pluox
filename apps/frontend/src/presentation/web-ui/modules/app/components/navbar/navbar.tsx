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

type TNavbarProps = {
	hasMainAction?: boolean;
};

export function Navbar(props: TNavbarProps) {
	let intl = useIntl(navbarI18n);
	let dialog = useDialog();

	return (
		<div
			className={cls(
				'flex flex-col',
				'left-0 bottom-0 fixed w-full',
				'px-(--navbar-gap) pt-(--navbar-gap) pb-[calc(var(--navbar-gap)*1.5)]',
				'border-neutral-200/50 rounded-tl-2xl rounded-tr-2xl border',
				'backdrop-blur-xs bg-neutral-50/50',
				'z-50',
			)}
		>
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
		</div>
	);
}
