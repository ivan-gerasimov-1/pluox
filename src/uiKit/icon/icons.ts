import CloseOutlineIcon from 'ionicons/dist/svg/close-circle-outline.svg';
import CreateOutlineIcon from 'ionicons/dist/svg/create-outline.svg';
import TrashOutlineIcon from 'ionicons/dist/svg/trash-outline.svg';

export enum IconName {
	Close = 'close',
	Edit = 'edit',
	Trash = 'trash',
}

const IconComponent = {
	[IconName.Trash]: TrashOutlineIcon,
	[IconName.Close]: CloseOutlineIcon,
	[IconName.Edit]: CreateOutlineIcon,
};

export function getIcon(iconName: IconName) {
	return IconComponent[iconName];
}
