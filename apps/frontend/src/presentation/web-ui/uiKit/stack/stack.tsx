import { cls } from '@root/presentation/web-ui/utils/classnames';

type TStackProps = {
	className?: string;
};

/** @deprecated */
export function Stack({
	className,
	children,
}: React.PropsWithChildren<TStackProps>) {
	return (
		<div className={cls('gap-4 flex flex-col', className)}>{children}</div>
	);
}
