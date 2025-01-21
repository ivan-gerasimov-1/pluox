import { cls } from '@root/presentation/web-ui/utils/classnames';

import { AppLink } from '@root/presentation/web-ui/uiKit/appLink/appLink';

import { Icon } from '@root/presentation/web-ui/uiKit/icon/icon';
import { EIconName } from '@root/presentation/web-ui/uiKit/icon/icons';
import { EIconSize } from '@root/presentation/web-ui/uiKit/icon/iconSize';

import styles from './iconLink.module.css';

type TIconLinkProps = {
	className?: string;

	to: string;

	iconName: EIconName;
	iconSize?: EIconSize;
};

export function IconLink(props: TIconLinkProps) {
	return (
		<AppLink to={props.to} className={cls(styles.iconLink, props.className)}>
			<Icon name={props.iconName} size={props.iconSize || EIconSize.MEDIUM} />
		</AppLink>
	);
}
