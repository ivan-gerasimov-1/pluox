import { Stack } from '@root/presentation/web-ui/uiKit/layout/layout';
import { cls } from '@root/presentation/web-ui/utils/classnames';

type TScreenProps = {
	id?: string;
	className?: string;
};

export function Screen({
	id,
	className,
	children,
}: React.PropsWithChildren<TScreenProps>) {
	return (
		<Stack id={id} className={cls('p-4 pt-2', className)}>
			{children}
		</Stack>
	);
}
