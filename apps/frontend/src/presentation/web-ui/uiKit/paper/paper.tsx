import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'cva';

import type { TSlottable } from '@/presentation/web-ui/uiKit/types';

let paperVariants = cva(
	[
		'bg-white',
		'border-gray-200/50 rounded-2xl rounded-tl-xl rounded-br-3xl border',
		'shadow-xl shadow-gray-200/25',
		'z-10 transition outline-none',
	],
	{
		variants: {
			material: {
				opaque: 'bg-white',
				crystal: 'backdrop-blur-sm bg-white/50',
			},
			gap: {
				sm: 'px-4 py-5',
				base: 'px-5 py-6',
				lg: '',
			},
			interactive: {
				false: null,
				true: [
					'',
					'hover:border-gray-200 hover:translate-y-0.5 hover:shadow-gray-50',
					'active:translate-y-1',
					'focus-visible:border-gray-900',
				],
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
			material: 'opaque',
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
	material,
	gap,
	interactive,
	scrollable,
	disabled,
	asChild,
	children,
}: React.PropsWithChildren<TPaperProps>) {
	let Component = asChild ? Slot : 'div';

	return (
		<Component
			className={paperVariants({
				className,
				material,
				gap,
				interactive,
				scrollable,
				disabled,
			})}
		>
			{children}
		</Component>
	);
}
