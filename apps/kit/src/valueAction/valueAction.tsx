import type React from 'react';

import { cn } from '@kit/utils/classnames';

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
			className={cn('flex w-full items-start justify-between gap-4', className)}
		>
			{children}
		</div>
	);
}

type TValueActionLeadingProps = TValueActionBaseProps & {
	label?: string;
};

export function ValueActionLeading({
	className,
	label,
	children,
}: React.PropsWithChildren<TValueActionLeadingProps>) {
	return (
		<div
			className={cn(
				'flex grow flex-col gap-1 overflow-hidden text-left text-sm',
				className,
			)}
		>
			{label && <ValueActionLabel>{label}</ValueActionLabel>}
			{children}
		</div>
	);
}

type TValueActionTrailingProps = TValueActionBaseProps;

export function ValueActionTrailing({
	className,
	children,
}: React.PropsWithChildren<TValueActionTrailingProps>) {
	return <div className={cn('m-1', className)}>{children}</div>;
}

/** @deprecated */
type TValueActionLabelProps = TValueActionBaseProps;

/** @deprecated */
export function ValueActionLabel({
	className,
	children,
}: React.PropsWithChildren<TValueActionLabelProps>) {
	return <div className={cn('text-gray-500', className)}>{children}</div>;
}

/** @deprecated */
type TValueActionContentProps = TValueActionBaseProps;

/** @deprecated */
export function ValueActionContent({
	className,
	children,
}: React.PropsWithChildren<TValueActionContentProps>) {
	return <div className={className}>{children}</div>;
}
