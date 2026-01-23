import type {
	TDialogStatus,
	TDialogType,
} from '@/web/uiKit/dialog/core/types';

export const EDialogType: Record<string, TDialogType> = {
	SHEET: 'sheet',
} as const;

export const EDialogStatus: Record<string, TDialogStatus> = {
	INITIAL: 'initial',
	OPEN: 'open',
	CLOSED: 'closed',
} as const;
