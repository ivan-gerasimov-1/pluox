import { Stack } from '@root/presentation/web-ui/uiKit/layout/layout';
import { cls } from '@root/presentation/web-ui/utils/classnames';

type TScreenProps = {
	className?: string;
};

export function Screen({
	className,
	children,
}: React.PropsWithChildren<TScreenProps>) {
	return (
		<Stack className={cls('p-4 mb-(--navbar-height)', className)}>
			{children}
		</Stack>
	);
}
