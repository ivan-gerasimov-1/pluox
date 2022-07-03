import TrashOutlineIcon from 'ionicons/dist/svg/trash-outline.svg';

export enum IconName {
	Trash = 'trash',
}

const IconComponent = {
	[IconName.Trash]: TrashOutlineIcon,
};

export function getIcon(iconName: IconName) {
	return IconComponent[iconName];
}
