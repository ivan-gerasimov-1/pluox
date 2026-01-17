import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'cva';

import type { TSlottable } from '@/presentation/web-ui/uiKit/types';

let paperVariants = cva(
	[
		'bg-white',
		'border-neutral-200/50 rounded-2xl rounded-tl-xl rounded-br-3xl border',
		'shadow-xl shadow-neutral-200/25',
		'z-10 transition outline-none',
	],
	{
		variants: {
			gap: {
				sm: 'px-4 py-5',
				base: 'px-5 py-6',
				lg: '',
			},
			interactive: {
				false: null,
				true: [
					'',
					'hover:border-neutral-200 hover:translate-y-0.5 hover:shadow-neutral-50',
					'active:translate-y-1',
					'focus-visible:border-neutral-900',
				],
			},
			transparent: {
				false: null,
				true: 'backdrop-blur-sm bg-white/25',
			},
			scrollable: {
				false: null,
				true: 'overflow-y-auto',
			},
			disabled: {
				false: null,
				true: 'opacity-50 pointer-events-none',
			},
		},
		defaultVariants: {
			gap: 'base',
			interactive: false,
		},
	},
);

type TPaperProps = VariantProps<typeof paperVariants> &
	TSlottable & {
		className?: string;
	};

export function Paper({
	className,
	gap,
	interactive,
	scrollable,
	transparent,
	disabled,
	asChild,
	children,
}: React.PropsWithChildren<TPaperProps>) {
	let Component = asChild ? Slot : 'div';

	return (
		<Component
			className={paperVariants({
				className,
				gap,
				interactive,
				transparent,
				scrollable,
				disabled,
			})}
		>
			{children}
		</Component>
	);
}
