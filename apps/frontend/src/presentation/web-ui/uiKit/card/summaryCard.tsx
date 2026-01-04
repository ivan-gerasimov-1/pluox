import { Card } from '@root/presentation/web-ui/uiKit/card/card';
import { cls } from '@root/presentation/web-ui/utils/classnames';

export function SummaryCard({
	className,
	children,
}: React.PropsWithChildren<{ className?: string }>) {
	return (
		<Card
			className={cls(
				className,
				'flex flex-col items-start justify-between',
				'px-5 py-4',
				/** @todo Move to SummaryCardHeader or SummaryCardTitle */
				'font-extrabold text-sm tracking-tight',
				'rounded-tl-lg rounded-tr-2xl rounded-bl-2xl rounded-br-3xl',
			)}
		>
			{children}
		</Card>
	);
}
