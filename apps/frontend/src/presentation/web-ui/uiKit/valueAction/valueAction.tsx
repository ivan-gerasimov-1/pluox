import type React from 'react';

import { cls } from '@root/presentation/web-ui/utils/classnames';

type TValueActionBaseProps = {
	className?: string;
};

type TValueActionProps = TValueActionBaseProps;

export function ValueAction({
	className,
	children,
}: React.PropsWithChildren<TValueActionProps>) {
	return (
		<div
			className={cls('[&+&]:mt-3 flex items-start justify-between', className)}
		>
			{children}
		</div>
	);
}

type TValueActionLeadingProps = TValueActionBaseProps;

export function ValueActionLeading({
	className,
	children,
}: React.PropsWithChildren<TValueActionLeadingProps>) {
	return (
		<div className={cls('gap-1 flex w-3/4 flex-col', className)}>
			{children}
		</div>
	);
}

type TValueActionTrailingProps = TValueActionBaseProps;

export function ValueActionTrailing({
	className,
	children,
}: React.PropsWithChildren<TValueActionTrailingProps>) {
	return <div className={cls('m-1', className)}>{children}</div>;
}

type TValueActionLabelProps = TValueActionBaseProps;

export function ValueActionLabel({
	className,
	children,
}: React.PropsWithChildren<TValueActionLabelProps>) {
	return (
		<div className={cls('text-sm text-neutral-600', className)}>{children}</div>
	);
}

type TValueActionContentProps = TValueActionBaseProps;

export function ValueActionContent({
	className,
	children,
}: React.PropsWithChildren<TValueActionContentProps>) {
	return <div className={cls('text-sm', className)}>{children}</div>;
}
