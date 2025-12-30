import { cls } from '@root/presentation/web-ui/utils/classnames';

type TBadgeProps = {
	className?: string;
};

export function Badge({
	className,
	children,
}: React.PropsWithChildren<TBadgeProps>) {
	return (
		<span
			className={cls(
				'px-3 py-2 border-neutral-200 rounded-2xl text-xs border text-center',
				className,
			)}
		>
			{children}
		</span>
	);
}
