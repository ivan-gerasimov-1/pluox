import { NavLink } from 'react-router';

import { cls } from '@root/presentation/web-ui/utils/classnames';

type TNavigableProps = {
	to: string;
	className?: string;
};

export function AppLink({
	className,
	to,
	children,
}: React.PropsWithChildren<TNavigableProps>) {
	return (
		<NavLink
			className={cls('leading-none text-inherit no-underline', className)}
			to={to}
		>
			{children}
		</NavLink>
	);
}
