import { cn } from '@kit/utils/classnames';

import { Stack } from '@kit/layout/layout';

type TViewProps = {
	id?: string;
	className?: string;
};

export function View({
	id,
	className,
	children,
}: React.PropsWithChildren<TViewProps>) {
	return (
		<Stack id={id} className={cn('p-4 pt-2', className)}>
			{children}
		</Stack>
	);
}
