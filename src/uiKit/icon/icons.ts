import CloseOutlineIcon from 'ionicons/dist/svg/close-circle-outline.svg';
import CreateOutlineIcon from 'ionicons/dist/svg/create-outline.svg';
import TrashOutlineIcon from 'ionicons/dist/svg/trash-outline.svg';
import PersonCircleOutlineIcon from 'ionicons/dist/svg/person-circle-outline.svg';
import LogInOutlineIcon from 'ionicons/dist/svg/log-in-outline.svg';
import LogOutOutlineIcon from 'ionicons/dist/svg/log-out-outline.svg';
import BackOutlineIcon from 'ionicons/dist/svg/chevron-back-outline.svg';
import CalendarOutlineIcon from 'ionicons/dist/svg/calendar-outline.svg';
import Settings from 'ionicons/dist/svg/options-outline.svg';
import CaretDown from 'ionicons/dist/svg/chevron-down-outline.svg';
import ArrowBack from 'ionicons/dist/svg/arrow-back-outline.svg';

export enum EIconName {
	Close = 'close',
	Edit = 'edit',
	Trash = 'trash',
	User = 'user',
	LogIn = 'logIn',
	LogOut = 'logOut',
	Back = 'back',
	Calendar = 'calendar',
	Settings = 'settings',
	CaretDown = 'caretDown',
	ArrowBack = 'arrowBack',
}

const IconComponent = {
	[EIconName.Trash]: TrashOutlineIcon,
	[EIconName.Close]: CloseOutlineIcon,
	[EIconName.Edit]: CreateOutlineIcon,
	[EIconName.User]: PersonCircleOutlineIcon,
	[EIconName.LogIn]: LogInOutlineIcon,
	[EIconName.LogOut]: LogOutOutlineIcon,
	[EIconName.Back]: BackOutlineIcon,
	[EIconName.Calendar]: CalendarOutlineIcon,
	[EIconName.Settings]: Settings,
	[EIconName.CaretDown]: CaretDown,
	[EIconName.ArrowBack]: ArrowBack,
};

export function getIcon(iconName: EIconName) {
	return IconComponent[iconName];
}
