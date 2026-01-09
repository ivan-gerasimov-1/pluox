import { Stack } from '@root/presentation/web-ui/uiKit/layout/layout';
import { cls } from '@root/presentation/web-ui/utils/classnames';

type TScreenProps = {
	className?: string;
};

export function Screen({
	className,
	children,
}: React.PropsWithChildren<TScreenProps>) {
	return (
		<div className={cls('flex min-h-dvh flex-col', className)}>{children}</div>
	);
}

type TScreenBodyProps = {
	className?: string;
};

export function ScreenBody({
	className,
	children,
}: React.PropsWithChildren<TScreenBodyProps>) {
	return (
		<Stack
			className={cls(
				'min-h-[calc(100dvh-var(--navbar-height))]',
				'gap-6',
				'p-4 mb-(--navbar-height)',
				className,
			)}
		>
			{children}
		</Stack>
	);
}
