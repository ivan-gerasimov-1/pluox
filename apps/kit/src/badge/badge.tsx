import { Slot } from '@radix-ui/react-slot';

import type { TSlottable } from '@kit/types';

import { cn } from '@kit/utils/classnames';

type TBadgesProps = {
	className?: string;
};

export function Badges({
	className,
	children,
}: React.PropsWithChildren<TBadgesProps>) {
	return (
		<div className={cn('flex flex-wrap gap-1 *:shrink-0 *:grow', className)}>
			{children}
		</div>
	);
}

type TBadgeProps = TSlottable & {
	className?: string;
};

export function Badge({
	className,
	asChild,
	children,
}: React.PropsWithChildren<TBadgeProps>) {
	let Component = asChild ? Slot : 'div';

	return (
		<Component
			className={cn(
				'px-4 py-2.5',
				'bg-gray-100 text-center text-xs leading-none whitespace-nowrap text-gray-800',
				'rounded-2xl',
				'border border-transparent',
				className,
			)}
		>
			{children}
		</Component>
	);
}
