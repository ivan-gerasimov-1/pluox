import {
	ChevronDown,
	Circle,
	Infinity as InfinityIcon,
	SlidersHorizontal,
	SquarePen,
	Trash2,
	Triangle,
} from 'lucide-react';

export const EIconName = {
	Edit: 'edit',
	Trash: 'trash',
	Settings: 'settings',
	CaretDown: 'caretDown',
	Circle: 'circle',
	Infinite: 'infinite',
	Triangle: 'triangle',
} as const;

export type TIconName = (typeof EIconName)[keyof typeof EIconName];

const IconComponent = {
	[EIconName.Trash]: Trash2,
	[EIconName.Edit]: SquarePen,
	[EIconName.Settings]: SlidersHorizontal,
	[EIconName.CaretDown]: ChevronDown,
	[EIconName.Circle]: Circle,
	[EIconName.Infinite]: InfinityIcon,
	[EIconName.Triangle]: Triangle,
};

export function getIcon(iconName: TIconName) {
	return IconComponent[iconName];
}
