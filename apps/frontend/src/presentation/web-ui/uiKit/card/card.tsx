import { cls } from '@root/presentation/web-ui/utils/classnames';

type TCardContainerProps = {
	className?: string;
};

export function CardContainer({
	className,
	children,
}: React.PropsWithChildren<TCardContainerProps>) {
	return (
		<div className={cls('gap-5 flex flex-col', className)}>{children}</div>
	);
}

type TCardProps = {
	className?: string;
};

export function Card({
	className,
	children,
}: React.PropsWithChildren<TCardProps>) {
	return (
		<div
			className={cls(
				'px-5 py-6 rounded-2xl border-gray-100 bg-white shadow-lg shadow-neutral-200/75 border',
				className,
			)}
		>
			{children}
		</div>
	);
}

type CardHeaderProps = {
	className?: string;
	as?: React.ElementType;
};

export function CardHeader({
	className,
	as: As = 'h2',
	children,
}: React.PropsWithChildren<CardHeaderProps>) {
	return <As className={cls('m-0 mb-3 text-sm', className)}>{children}</As>;
}
