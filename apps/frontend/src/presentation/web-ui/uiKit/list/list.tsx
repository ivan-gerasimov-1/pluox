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
