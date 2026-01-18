import { cn } from '@/presentation/web-ui/utils/classnames';

type TitleProps = {
	className?: string;
	as?: React.ElementType;
};

/**
 * @todo
 * 1. Add level prop: top (h1), base (h2), sub (h3).
 *   - Default is base
 *   - Top is visually hidden by default (?) or add hidden prop
 */
export function Title({
	className,
	as: As = 'h2',
	children,
}: React.PropsWithChildren<TitleProps>) {
	return (
		<As className={cn('text-sm tracking-tight font-extrabold', className)}>
			{children}
		</As>
	);
}
