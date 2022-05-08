import AddOutlineIcon from 'ionicons/dist/svg/add-outline.svg';
import SettingsOutlineIcon from 'ionicons/dist/svg/settings-outline.svg';

export enum IconName {
	Add = 'add',
	Settings = 'settings',
}

const IconComponent = {
	[IconName.Add]: AddOutlineIcon,
	[IconName.Settings]: SettingsOutlineIcon,
};

export function getIcon(iconName: IconName) {
	return IconComponent[iconName];
}
