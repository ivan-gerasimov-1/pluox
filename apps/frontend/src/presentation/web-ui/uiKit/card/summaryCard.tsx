import { Card } from '@root/presentation/web-ui/uiKit/card/card';
import { cls } from '@root/presentation/web-ui/utils/classnames';

export function SummaryCard({
	className,
	children,
}: React.PropsWithChildren<{ className?: string }>) {
	return (
		<Card className={cls('rounded-tl-lg rounded-br-3xl', className)}>
			{children}
		</Card>
	);
}
