import { NavLink } from 'react-router';

import { cn } from '@/presentation/web-ui/utils/classnames';

type TAppLinkProps = {
	className?: string;

	to: string;
};

export function AppLink({
	className,
	to,
	children,
}: React.PropsWithChildren<TAppLinkProps>) {
	return (
		<NavLink
			className={cn('leading-none text-inherit no-underline', className)}
			to={to}
		>
			{children}
		</NavLink>
	);
}
