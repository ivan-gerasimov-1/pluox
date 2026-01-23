import { useNavigate } from 'react-router';

import { cn } from '@/presentation/web/utils/classnames';

type TNavLinkProps = {
	className?: string;

	to: string;
};

/**
 * @todo
 * 1. Don’t override borders if provided
 * 2. Add active state (to use in AppNavbar)
 */
export function NavLink({
	className,
	to,
	children,
}: React.PropsWithChildren<TNavLinkProps>) {
	let navigate = useNavigate();

	return (
		<button
			className={cn(
				[
					'm-0 p-0',
					'font-[inherit] leading-none text-inherit',
					'bg-transparent',
					'border-0 border-none',
					'appearance-none',
				],
				className,
			)}
			type="button"
			onClick={() => navigate(to)}
		>
			{children}
		</button>
	);
}
