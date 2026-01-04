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
		<div
			className={cls(
				'p-4 gap-6 mt-(--header-height) mb-(--navbar-height) flex min-h-[calc(100dvh-var(--header-height)-var(--navbar-height))] flex-col',
				className,
			)}
		>
			{children}
		</div>
	);
}
