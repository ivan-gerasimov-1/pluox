import { NavLink } from 'react-router';

import { cls } from '@root/presentation/web-ui/utils/classnames';

type TNavigableProps = {
	to: string;
	className?: string;
};

export function AppLink(props: React.PropsWithChildren<TNavigableProps>) {
	return (
		<NavLink
			className={cls('leading-none text-inherit no-underline', props.className)}
			to={props.to}
		>
			{props.children}
		</NavLink>
	);
}
