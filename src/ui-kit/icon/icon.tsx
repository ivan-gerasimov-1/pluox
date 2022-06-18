import { useMemo } from 'react';
import { getIcon, IconName } from './icons';

type TIconProps = {
	name: IconName;
};

export function Icon(props: TIconProps) {
	let SvgIcon = useMemo(() => {
		return getIcon(props.name);
	}, [props.name]);

	return <SvgIcon width="32px" height="32px" viewBox="0 0 512 512" />;
}

Icon.IconName = IconName;
