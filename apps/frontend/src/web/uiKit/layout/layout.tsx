import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'cva';

import type { TSlottable } from '@/web/uiKit/types';
import { cn } from '@/web/utils/classnames';

type TBaseProps = {
	id?: string;
	className?: string;
};

type TStackProps = TBaseProps &
	TSlottable & {
		row?: boolean;
		center?: boolean;
		between?: boolean;
	};

export function Stack({
	id,
	className,
	row,
	center,
	between,
	asChild,
	children,
}: React.PropsWithChildren<TStackProps>) {
	let Component = asChild ? Slot : 'div';

	return (
		<Component
			id={id}
			className={cn('gap-4 flex flex-col', className, {
				'flex-row': row,
				'items-center justify-center': center,
				'justify-between': between,
			})}
		>
			{children}
		</Component>
	);
}

let gridVariants = cva('gap-4 grid', {
	variants: {
		cols: {
			'2': 'grid-cols-2',
		},
		rows: {
			'2': 'grid-rows-2',
			'3': 'grid-rows-3',
			'6': 'grid-rows-6',
		},
	},
	defaultVariants: {
		cols: '2',
		rows: '2',
	},
});

type TGridProps = TBaseProps & VariantProps<typeof gridVariants>;

export function Grid({
	className,
	rows,
	cols,
	children,
}: React.PropsWithChildren<TGridProps>) {
	return (
		<div
			className={gridVariants({
				className,
				rows,
				cols,
			})}
		>
			{children}
		</div>
	);
}
