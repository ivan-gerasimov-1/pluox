import { cls } from '@root/presentation/web-ui/utils/classnames';

export function SummaryCardContainer({
	className,
	children,
}: React.PropsWithChildren<{ className?: string }>) {
	return (
		<div
			className={cls(
				className,
				'gap-4 grid min-h-[300px] grid-cols-2 grid-rows-2',
			)}
		>
			{children}
		</div>
	);
}

export function SummaryCard({
	className,
	children,
}: React.PropsWithChildren<{ className?: string }>) {
	return (
		<div
			className={cls(
				className,
				'flex flex-col items-start justify-between',
				'px-5 py-4',
				'font-extrabold text-sm tracking-tight',
				'bg-white',
				'border-neutral-200/50 border',
				'shadow-lg shadow-neutral-200/75',
				'rounded-tl-lg rounded-tr-2xl rounded-bl-2xl rounded-br-3xl',
			)}
		>
			{children}
		</div>
	);
}
