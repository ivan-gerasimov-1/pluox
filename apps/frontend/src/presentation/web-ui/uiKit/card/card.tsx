import React from 'react';

import { cls } from '@root/presentation/web-ui/utils/classnames';

type TCardProps = {
	touchable?: boolean;
	noPadding?: boolean;
};

export function Card(props: React.PropsWithChildren<TCardProps>) {
	return (
		<div
			className={cls(
				'px-5 py-6 rounded-2xl border-gray-100 bg-white shadow-lg shadow-neutral-200/75 border',
				{
					'p-0': props.noPadding,
					'hover:shadow-neutral-200/25 focus:shadow-neutral-200/25 active:shadow-neutral-200/25 transition-shadow':
						props.touchable,
				},
			)}
		>
			{props.children}
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
