import { Stack } from '@/presentation/web-ui/uiKit/layout/layout';
import { cn } from '@/presentation/web-ui/utils/classnames';

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
		<Stack id={id} className={cn('p-4 pt-2', className)}>
			{children}
		</Stack>
	);
}
