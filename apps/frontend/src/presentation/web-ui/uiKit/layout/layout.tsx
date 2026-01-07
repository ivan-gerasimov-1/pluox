import { cva, type VariantProps } from 'cva';

import { cls } from '@root/presentation/web-ui/utils/classnames';

type TBaseProps = {
	className?: string;
};

type TStackProps = TBaseProps;

export function Stack({
	className,
	children,
}: React.PropsWithChildren<TStackProps>) {
	return (
		<div className={cls('gap-4 flex flex-col', className)}>{children}</div>
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
