import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'cva';

const buttonVariants = cva(
	[
		'm-0 px-4 py-3',
		'rounded-2xl border',
		'font-[inherit] text-xs font-bold',
		'text-center leading-none whitespace-nowrap uppercase',
		'outline-0 transition',
		'disabled:pointer-events-none disabled:opacity-75',
		'hover:translate-y-0.5 hover:scale-98 hover:shadow-[0_0_0_3px_var(--color-gray-50)_inset]',
		'focus:translate-y-0.5 focus:scale-98 focus:shadow-[0_0_0_3px_var(--color-gray-50)_inset]',
		'active:translate-y-0.5 active:scale-98 active:shadow-[0_0_0_5px_var(--color-gray-50)_inset]',
	],
	{
		variants: {
			intent: {
				primary: ['border-gray-900 bg-gray-900', 'text-gray-50!'],
				danger: [
					'border-red-500',
					'bg-gray-50 text-red-500',
					'hover:bg-red-500 hover:text-gray-50',
				],
			},
			size: {
				// eslint-disable-next-line id-length
				s: 'py-2',
				// eslint-disable-next-line id-length
				m: 'py-4',
				// eslint-disable-next-line id-length
				l: 'py-5 text-sm',
			},
			wide: {
				false: null,
				true: 'w-full',
			},
		},
		defaultVariants: {
			intent: 'primary',
			size: 'm',
			wide: false,
		},
	},
);

export type TButtonProps = VariantProps<typeof buttonVariants> & {
	className?: string;
	onClick?: () => void;
	disabled?: boolean;
	asChild?: boolean;
} & (
		| {
				type?: 'button';
				form?: never;
		  }
		| {
				type: 'submit';
				form?: string;
		  }
	);

/**
 * @todo
 * 1. Investigate usage of onPointerDown/onKeyDown
 */
export function Button({
	type = 'button',

	className,
	intent,
	size,
	wide,

	asChild,
	children,

	...props
}: React.PropsWithChildren<TButtonProps>) {
	let Component = asChild ? Slot : 'button';

	return (
		<Component
			// @ts-expect-error | "type" is only passed to "button", but not to Slot
			type={type}
			className={buttonVariants({ className, size, intent, wide })}
			{...props}
		>
			{children}
		</Component>
	);
}
