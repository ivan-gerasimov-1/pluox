import { useState } from 'react';

import { useIntl } from '@/presentation/web/modules/intl/useIntl/useIntl';
import { UserNameEditActionSheetI18n } from '@/presentation/web/modules/settings/views/settings/components/userNameEditActionSheet/userNameEditActionSheet.i18n';
import { Button } from '@/presentation/web/uiKit/button/button';
import type { TDialogComponentProps } from '@/presentation/web/uiKit/dialog/core/types';
import { Input } from '@/presentation/web/uiKit/input/input';

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
