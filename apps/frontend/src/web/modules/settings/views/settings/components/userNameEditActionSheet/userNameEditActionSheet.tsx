import { useState } from 'react';

import { useIntl } from '@/web/modules/intl/useIntl/useIntl';
import { UserNameEditActionSheetI18n } from '@/web/modules/settings/views/settings/components/userNameEditActionSheet/userNameEditActionSheet.i18n';
import { Button } from '@/web/uiKit/button/button';
import type { TDialogComponentProps } from '@/web/uiKit/dialog/core/types';
import { Input } from '@/web/uiKit/input/input';

type UserNameEditActionSheetProps = TDialogComponentProps<
	{
		userName: string;
	},
	{
		userName: string;
	}
>;

export function UserNameEditActionSheet(props: UserNameEditActionSheetProps) {
	let intl = useIntl(UserNameEditActionSheetI18n);
	let [userName, setUserName] = useState(props.userName);

	return (
		<>
			<Input
				type="text"
				// className="py-3 px-4 text-sm rounded-2xl color-inherit w-full border-none bg-transparent font-[inherit]"
				value={userName}
				onChange={(event) => setUserName(event.target.value)}
				autoFocus
			/>

			<Button
				className="mt-5"
				onClick={() => {
					props.close({
						userName,
					});
				}}
				wide
			>
				{intl.translate('save')}
			</Button>
		</>
	);
}
