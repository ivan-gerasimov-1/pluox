import AddOutlineIcon from 'ionicons/dist/svg/add-outline.svg';

export enum IconName {
	Add = 'add',
}

const IconComponent = {
	[IconName.Add]: AddOutlineIcon,
};

export function getIcon(iconName: IconName) {
	return IconComponent[iconName];
}
