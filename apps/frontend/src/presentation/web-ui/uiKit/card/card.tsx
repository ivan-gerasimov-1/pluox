import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'cva';

import type { TSlottable } from '@/presentation/web-ui/uiKit/types';
import { cls } from '@/presentation/web-ui/utils/classnames';

let cardVariants = cva(
	[
		'bg-white',
		'border-neutral-200/50 rounded-2xl rounded-tl-xl rounded-br-3xl border',
		'shadow-xl shadow-neutral-200/25',
		'z-10 transition outline-none',
	],
	{
		variants: {
			interactive: {
				false: null,
				true: [
					'',
					'hover:border-neutral-200 hover:translate-y-0.5 hover:shadow-neutral-50',
					'active:translate-y-1',
					'focus-visible:border-neutral-900',
				],
			},
			gap: {
				sm: 'px-4 py-5',
				base: 'px-5 py-6',
				lg: '',
			},
			summary: {
				false: null,
				true: 'px-4! py-5!',
			},
		},
		defaultVariants: {
			gap: 'base',
			interactive: false,
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
	gap,
	interactive,
	summary,
	asChild,
	children,
}: React.PropsWithChildren<TCardProps>) {
	let Component = asChild ? Slot : 'div';

	return (
		<Component
			className={cardVariants({
				className,
				gap,
				interactive,
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
