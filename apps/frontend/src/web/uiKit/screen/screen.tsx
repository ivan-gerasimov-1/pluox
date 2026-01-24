import { cn } from '@/web/utils/classnames';

import { Stack } from '@/web/uiKit/layout/layout';

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
