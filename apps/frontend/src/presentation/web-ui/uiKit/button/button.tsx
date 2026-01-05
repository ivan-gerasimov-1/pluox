import { cva, type VariantProps } from 'cva';

const buttonVariants = cva(
	[
		'm-0 px-4 py-3',
		'rounded-2xl border',
		'text-xs font-bold font-[inherit]',
		'text-center leading-none uppercase',
		'outline-0 transition',
		'hover:shadow-[0_0_0_2px_var(--white-100)_inset]',
		'focus:shadow-[0_0_0_2px_var(--white-100)_inset]',
		'active:shadow-[0_0_0_4px_var(--white-100)_inset]',
	],
	{
		variants: {
			intent: {
				primary: ['border-neutral-900', 'bg-neutral-900 text-white'],
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
	className,
	type = 'button',
	form,
	intent,
	size,
	wide,
	onClick,
	children,
}: React.PropsWithChildren<TButtonProps>) {
	return (
		<button
			type={type}
			form={type === 'submit' ? form : undefined}
			className={buttonVariants({ className, size, intent, wide })}
			onClick={onClick}
		>
			{children}
		</button>
	);
}
