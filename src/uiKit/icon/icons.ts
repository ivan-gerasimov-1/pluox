import CloseOutlineIcon from 'ionicons/dist/svg/close-circle-outline.svg';
import CreateOutlineIcon from 'ionicons/dist/svg/create-outline.svg';
import TrashOutlineIcon from 'ionicons/dist/svg/trash-outline.svg';

export enum EIconName {
	Close = 'close',
	Edit = 'edit',
	Trash = 'trash',
}

const IconComponent = {
	[EIconName.Trash]: TrashOutlineIcon,
	[EIconName.Close]: CloseOutlineIcon,
	[EIconName.Edit]: CreateOutlineIcon,
};

export function getIcon(iconName: EIconName) {
	return IconComponent[iconName];
}
