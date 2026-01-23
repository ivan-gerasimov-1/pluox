import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'cva';

import type { TSlottable } from '@/presentation/web/uiKit/types';

let sheetVariants = cva(
	['rounded-2xl rounded-tl-xl rounded-br-3xl', 'shadow-xl shadow-gray-100'],
	{
		variants: {
			material: {
				paper: 'bg-white',
				glass: 'backdrop-blur-sm bg-white/50',
			},
			gap: {
				xs: 'px-3 py-4',
				sm: 'px-4 py-5',
				base: 'px-5 py-6',
				lg: 'px-6 py-7',
			},
			interactive: {
				false: null,
				true: [
					'transition',
					'outline-none',
					'hover:border-gray-200 hover:translate-y-0.5 hover:shadow-gray-50',
					'focus-visible:border-gray-900',
					'active:translate-y-1',
				],
			},
			scrollable: {
				false: 'overflow-hidden',
				true: 'overflow-y-auto',
			},
			disabled: {
				false: null,
				true: 'opacity-50 pointer-events-none',
			},
		},
		defaultVariants: {
			material: 'paper',
			gap: 'base',
			interactive: false,
			scrollable: false,
			disabled: false,
		},
	},
);

type TSheetProps = VariantProps<typeof sheetVariants> &
	TSlottable & {
		className?: string;
	};

export function Sheet({
	className,
	material,
	gap,
	interactive,
	asChild,
	children,
	...props
}: React.PropsWithChildren<TSheetProps>) {
	let Component = asChild ? Slot : 'div';

	return (
		<Component
			className={sheetVariants({
				className,
				material,
				gap,
				interactive,
				disabled: props.disabled,
			})}
			{...props}
		>
			{children}
		</Component>
	);
}
