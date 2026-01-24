import { cn } from '@kit/utils/classnames';

type TDotSpaceProps = {
	className?: string;
};

export function DotSpace({ className }: TDotSpaceProps) {
	return (
		<div
			className={cn(
				'mx-1.5 -mb-1 h-4.5 w-full bg-radial-[circle,var(--color-gray-400)_1px,transparent_0] bg-size-[0.5rem_1.25rem]',
				className,
			)}
		/>
	);
}
