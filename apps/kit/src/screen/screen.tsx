import { cn } from '@kit/utils/classnames';

import { Stack } from '@kit/layout/layout';

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
