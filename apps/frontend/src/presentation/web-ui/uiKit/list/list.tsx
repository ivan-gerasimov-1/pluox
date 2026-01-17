import { cn } from '@/presentation/web-ui/utils/classnames';

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
			className={cn(
				'min-w-12 min-h-12 p-3',
				'flex items-center justify-center',
				'rounded-full',
				'text-xl text-gray-700 font-semibold font-sans leading-none',
				'to-white from-gray-100 bg-linear-315',
				'select-none',
				className,
			)}
			onClick={onClick}
		>
			{children}
		</span>
	);
}
