import { cls } from '@root/presentation/web-ui/utils/classnames';

type TScreenBodyProps = {
	className?: string;
};

export function ScreenBody(props: React.PropsWithChildren<TScreenBodyProps>) {
	return (
		<div
			className={cls(
				'p-4 gap-6 mt-[var(--header-height)] mb-[var(--navbar-height)] flex flex-col',
				props.className,
			)}
		>
			{props.children}
		</div>
	);
}
