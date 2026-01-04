import { cls } from '@root/presentation/web-ui/utils/classnames';

type TGridProps = {
	className?: string;
};

export function Grid({
	className,
	children,
}: React.PropsWithChildren<TGridProps>) {
	return (
		<div className={cls(className, 'gap-4 grid grid-cols-2 grid-rows-2')}>
			{children}
		</div>
	);
}
