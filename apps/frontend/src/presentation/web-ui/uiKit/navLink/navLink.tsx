import { NavLink as RouterLink } from 'react-router';

import { cn } from '@/presentation/web-ui/utils/classnames';

type TNavLinkProps = {
	className?: string;

	to: string;
};

export function NavLink({
	className,
	to,
	children,
}: React.PropsWithChildren<TNavLinkProps>) {
	return (
		<RouterLink
			className={cn('leading-none text-inherit no-underline', className)}
			to={to}
		>
			{children}
		</RouterLink>
	);
}
