import { ELocaleCode } from '@root/core/modules/intl/domain/enums';

import { useTitle } from '@root/presentation/web-ui/uiKit/header/hooks/useTitle';

import styles from './header.module.css';

export type THeaderProps = {
	title: { [ELocaleCode.EN_US]: string; [ELocaleCode.RU_RU]: string };
};

export function Header(props: THeaderProps) {
	const title = useTitle(props);

	return (
		<div className={styles.container}>
			<h1 className={styles.title}>{title}</h1>
		</div>
	);
}
