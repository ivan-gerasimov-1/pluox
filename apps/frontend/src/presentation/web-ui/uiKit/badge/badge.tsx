import { Slot } from '@radix-ui/react-slot';

import type { TSlottable } from '@/presentation/web-ui/uiKit/types';
import { cn } from '@/presentation/web-ui/utils/classnames';

type TBadgesProps = {
	className?: string;
};

export function Badges({
	className,
	children,
}: React.PropsWithChildren<TBadgesProps>) {
	return (
		<div className={cn('gap-1 flex flex-wrap *:shrink-0 *:grow', className)}>
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
				'text-xs bg-gray-100 text-gray-800 text-center leading-none whitespace-nowrap',
				'rounded-2xl',
				'border-0',
				className,
			)}
		>
			{children}
		</Component>
	);
}
