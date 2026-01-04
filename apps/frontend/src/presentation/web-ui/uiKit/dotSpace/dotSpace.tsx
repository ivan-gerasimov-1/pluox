import { cls } from '@root/presentation/web-ui/utils/classnames';

type TDotSpaceProps = {
	className?: string;
};

export function DotSpace({ className }: TDotSpaceProps) {
	return (
		<div
			className={cls(
				'h-4.5 ml-1 w-full bg-radial-[circle,var(--color-neutral-400)_1px,transparent_0] bg-size-[10px_30px]',
				className,
			)}
		/>
	);
}
