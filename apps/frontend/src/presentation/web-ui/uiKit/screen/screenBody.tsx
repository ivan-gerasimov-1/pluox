import { cls } from '@root/presentation/web-ui/utils/classnames';

type TScreenBodyProps = {
	className?: string;
};

export function ScreenBody(props: React.PropsWithChildren<TScreenBodyProps>) {
	return (
		<div
			className={cls(
				'p-4 gap-6 mt-(--header-height) mb-(--navbar-height) flex min-h-[calc(100dvh-var(--header-height)-var(--navbar-height))] flex-col',
				props.className,
			)}
		>
			{props.children}
		</div>
	);
}
