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

type TGridProps = TBaseProps;

export function Grid({
	className,
	children,
}: React.PropsWithChildren<TGridProps>) {
	return (
		<div className={cls('gap-4 grid grid-cols-2 grid-rows-2', className)}>
			{children}
		</div>
	);
}
