import { cls } from '@root/presentation/web-ui/utils/classnames';

export type TCategoryIconProps = {
	className?: string;
	onClick?(): void;
};

export function CategoryIcon({
	className,
	children,
	onClick,
}: React.PropsWithChildren<TCategoryIconProps>) {
	return (
		<span
			className={cls(
				'min-w-12 min-h-12 p-3',
				'flex items-center justify-center',
				'bg-neutral-100 rounded-ss-xl rounded-se-md rounded-es-md rounded-ee-2xl rounded',
				'text-base text-neutral-600 font-semibold font-sans leading-none',
				'border-neutral-200/50 border',
				'bg-linear-135 from-(--color-grey-100) to-(--white-200)',
				'select-none',
				className,
			)}
			onClick={onClick}
		>
			{children}
		</span>
	);
}
