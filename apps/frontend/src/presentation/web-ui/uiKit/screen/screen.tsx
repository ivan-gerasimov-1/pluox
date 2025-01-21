import { cls } from '@root/presentation/web-ui/utils/classnames';

import { Navbar } from '@root/presentation/web-ui/modules/app/components/navbar/navbar';

import styles from './screen.module.css';

type TScreenProps = {
	children: React.ReactNode;
	className?: string;

	hasNavbar?: boolean;
};

export function Screen(props: TScreenProps) {
	return (
		<div
			className={cls(
				styles.container,
				{
					[styles.withNavbar]: props.hasNavbar,
				},
				props.className,
			)}
		>
			{props.children}

			{props.hasNavbar && <Navbar />}
		</div>
	);
}
