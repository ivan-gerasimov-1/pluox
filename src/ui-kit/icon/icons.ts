import AddOutlineIcon from 'ionicons/dist/svg/add-outline.svg';
import TrashOutlineIcon from 'ionicons/dist/svg/trash-outline.svg';

export enum IconName {
	Add = 'add',
	Trash = 'trash',
}

const IconComponent = {
	[IconName.Add]: AddOutlineIcon,
	[IconName.Trash]: TrashOutlineIcon,
};

export function getIcon(iconName: IconName) {
	return IconComponent[iconName];
}
