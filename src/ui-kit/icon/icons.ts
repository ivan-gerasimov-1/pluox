import CloseOutlineIcon from 'ionicons/dist/svg/close-circle-outline.svg';
import TrashOutlineIcon from 'ionicons/dist/svg/trash-outline.svg';

export enum IconName {
	Close = 'close',
	Trash = 'trash',
}

const IconComponent = {
	[IconName.Trash]: TrashOutlineIcon,
	[IconName.Close]: CloseOutlineIcon,
};

export function getIcon(iconName: IconName) {
	return IconComponent[iconName];
}
