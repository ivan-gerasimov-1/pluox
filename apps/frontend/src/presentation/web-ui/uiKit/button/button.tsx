import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'cva';

const buttonVariants = cva(
	[
		'm-0 px-4 py-3',
		'rounded-2xl border',
		'text-xs font-bold font-[inherit]',
		'text-center leading-none uppercase whitespace-nowrap',
		'outline-0 transition',
		'hover:shadow-[0_0_0_2px_var(--color-neutral-50)_inset]',
		'focus:shadow-[0_0_0_2px_var(--color-neutral-50)_inset]',
		'active:shadow-[0_0_0_4px_var(--color-neutral-50)_inset]',
	],
	{
		variants: {
			intent: {
				primary: ['border-neutral-900', 'bg-neutral-900 text-neutral-50'],
				danger: [
					'border-red-500',
					'bg-neutral-50 text-red-500',
					'hover:bg-red-500 hover:text-neutral-50',
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
