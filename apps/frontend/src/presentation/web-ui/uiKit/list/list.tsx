import { cls } from '@/presentation/web-ui/utils/classnames';

export type TListIconProps = {
	className?: string;
	onClick?(): void;
};

export function ListIcon({
	className,
	children,
	onClick,
}: React.PropsWithChildren<TListIconProps>) {
	return (
		<span
			className={cls(
				'min-w-12 min-h-12 p-3',
				'flex items-center justify-center',
				'rounded-ss-xl rounded-se-md rounded-es-md rounded-ee-2xl rounded',
				'text-xl text-neutral-700 font-semibold font-sans leading-none',
				'to-white from-neutral-100 bg-linear-45',
				'select-none',
				className,
			)}
			onClick={onClick}
		>
			{children}
		</span>
	);
}
