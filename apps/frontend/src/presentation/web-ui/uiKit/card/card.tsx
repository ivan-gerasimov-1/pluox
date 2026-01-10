import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'cva';

import type { TSlottable } from '@root/presentation/web-ui/uiKit/types';
import { cls } from '@root/presentation/web-ui/utils/classnames';

let cardVariants = cva(
	[
		'gap-3 flex flex-col',
		'px-5 py-6',
		'bg-white',
		'border-neutral-100 rounded-2xl border',
		'shadow-lg shadow-neutral-200/75',
	],
	{
		variants: {
			summary: {
				false: null,
				true: 'px-4! py-5! rounded-tl-lg rounded-br-3xl',
			},
		},
		defaultVariants: {
			summary: false,
		},
	},
);

type TCardProps = VariantProps<typeof cardVariants> &
	TSlottable & {
		className?: string;
	};

export function Card({
	className,
	summary,
	asChild,
	children,
}: React.PropsWithChildren<TCardProps>) {
	let Component = asChild ? Slot : 'div';

	return (
		<Component
			className={cardVariants({
				className,
				summary,
			})}
		>
			{children}
		</Component>
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
