import { Slot } from '@radix-ui/react-slot';

import type { TSlottable } from '@/presentation/web-ui/uiKit/types';
import { cls } from '@/presentation/web-ui/utils/classnames';

type TBaseProps = {
	className?: string;
};

export function ListItem({
	className,
	asChild,
	children,
}: React.PropsWithChildren<TBaseProps & TSlottable>) {
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

export type TListIconProps = TBaseProps & {
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
