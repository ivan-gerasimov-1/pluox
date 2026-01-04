import { cls } from '@root/presentation/web-ui/utils/classnames';

export type TCategoryIconProps = {
	className?: string;
	onClick?: () => void;
};

export function CategoryIcon({
	className,
	children,
	onClick,
}: React.PropsWithChildren<TCategoryIconProps>) {
	return (
		<span
			className={cls(
				'rounded-ss-xl rounded-se-md rounded-es-md rounded-ee-2xl text-2xl bg-neutral-100 rounded flex h-[50px] w-[50px] items-center justify-center select-none',
				className,
			)}
			onClick={onClick}
		>
			{children}
		</span>
	);
}
