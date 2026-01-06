import { cva, VariantProps } from 'cva';

import { cls } from '@root/presentation/web-ui/utils/classnames';

let cardVariants = cva(
	[
		'gap-3 flex flex-col',
		'px-5 py-6',
		'bg-white',
		'border-gray-100 rounded-2xl border',
		'shadow-lg shadow-neutral-200/75',
	],
	{
		variants: {
			summary: {
				false: null,
				true: 'rounded-tl-lg rounded-br-3xl',
			},
		},
		defaultVariants: {
			summary: false,
		},
	},
);

type TCardProps = VariantProps<typeof cardVariants> & {
	className?: string;
};

export function Card({
	className,
	summary,
	children,
}: React.PropsWithChildren<TCardProps>) {
	return (
		<div
			className={cardVariants({
				className,
				summary,
			})}
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
