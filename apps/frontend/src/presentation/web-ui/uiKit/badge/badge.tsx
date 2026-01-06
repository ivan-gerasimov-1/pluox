import { Slot } from '@radix-ui/react-slot';

import type { TSlottable } from '@root/presentation/web-ui/uiKit/types';
import { cls } from '@root/presentation/web-ui/utils/classnames';

type TBadgesProps = {
	className?: string;
};

export function Badges({
	className,
	children,
}: React.PropsWithChildren<TBadgesProps>) {
	return (
		<div className={cls('gap-1 flex flex-wrap *:shrink-0 *:grow', className)}>
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
			className={cls(
				'px-4 py-2.5',
				'text-xs bg-white text-neutral-800 text-center leading-none whitespace-nowrap',
				'border-neutral-200/50 rounded-2xl border',
				className,
			)}
		>
			{children}
		</Component>
	);
}
