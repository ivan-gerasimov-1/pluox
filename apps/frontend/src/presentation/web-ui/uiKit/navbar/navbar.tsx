import { Stack } from '@/presentation/web-ui/uiKit/layout/layout';
import { Paper } from '@/presentation/web-ui/uiKit/paper/paper';
import { cls } from '@/presentation/web-ui/utils/classnames';

type TNavbarProps = {
	id?: string;
};

export function Navbar({
	id,
	children,
}: React.PropsWithChildren<TNavbarProps>) {
	return (
		<Paper material="crystal" asChild>
			<Stack
				id={id}
				className={cls(
					'right-0 left-0 bottom-0 fixed',
					'gap-0!',
					'px-(--navbar-gap)! pt-(--navbar-gap)! pb-[calc(var(--navbar-gap)*1.5)]!',
					'rounded-tl-3xl! rounded-tr-3xl! rounded-none!',
				)}
			>
				{children}
			</Stack>
		</Paper>
	);
}
