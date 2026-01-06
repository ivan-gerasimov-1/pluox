import { Slot } from '@radix-ui/react-slot';

import type { TSlottable } from '@root/presentation/web-ui/uiKit/types';
import { cls } from '@root/presentation/web-ui/utils/classnames';

type TListProps = {
	className?: string;
};

export function List({
	className,
	children,
}: React.PropsWithChildren<TListProps>) {
	return (
		<div
			className={cls('gap-2.5 m-0 p-0 flex list-none flex-col', className)}
			role="list"
		>
			{children}
		</div>
	);
}

type TListItemProps = TSlottable & {
	className?: string;
};

export function ListItem({
	className,
	asChild,
	children,
}: React.PropsWithChildren<TListItemProps>) {
	let Component = asChild ? Slot : 'div';

	return (
		<Component
			className={cls(
				'gap-4 flex w-full items-center justify-start',
				'p-4',
				'rounded-2xl border-neutral-200/50 border',
				'bg-white shadow-(--box-shadow-90)',
				'transition outline-none',
				'hover:border-neutral-200 hover:-translate-y-px hover:shadow-(--box-shadow-100)',
				'active:shadow-(--box-shadow-90)',
				'focus-visible:border-neutral-900',
				className,
			)}
			role="listitem"
		>
			{children}
		</Component>
	);
}
