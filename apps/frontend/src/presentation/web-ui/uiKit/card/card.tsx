import { cls } from '@root/presentation/web-ui/utils/classnames';

type TCardProps = {
	className?: string;
};

export function Card({
	className,
	children,
}: React.PropsWithChildren<TCardProps>) {
	return (
		<div
			className={cls(
				'gap-3 flex flex-col',
				'px-5 py-6',
				'bg-white',
				'border-gray-100 rounded-2xl border',
				'shadow-lg shadow-neutral-200/75',
				className,
			)}
		>
			{children}
		</div>
	);
}

type CardHeaderProps = {
	className?: string;
	as?: React.ElementType;
};

export function CardHeader({
	className,
	as: As = 'h2',
	children,
}: React.PropsWithChildren<CardHeaderProps>) {
	return (
		<As className={cls('text-sm tracking-tight', className)}>{children}</As>
	);
}
