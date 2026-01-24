import { cn } from '@kit/utils/classnames';

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
				'min-h-12 min-w-12 p-3',
				'flex items-center justify-center',
				'rounded-full',
				'font-sans text-xl leading-none font-semibold text-gray-700',
				'bg-linear-315 from-gray-100 to-white',
				'select-none',
				className,
			)}
			onClick={onClick}
		>
			{children}
		</span>
	);
}
