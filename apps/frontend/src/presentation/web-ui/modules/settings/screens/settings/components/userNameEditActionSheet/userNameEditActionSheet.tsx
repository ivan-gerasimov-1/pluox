import { useState } from 'react';

import { useIntl } from '@root/presentation/web-ui/modules/intl/useIntl/useIntl';
import { settingsI18n } from '@root/presentation/web-ui/modules/settings/screens/settings/settings.i18n';
import { Button } from '@root/presentation/web-ui/uiKit/button/button';
import { TDialogComponentProps } from '@root/presentation/web-ui/uiKit/dialog/core/types';

export function UserNameEditActionSheet(
	props: TDialogComponentProps<
		{
			userName: string;
		},
		{
			userName: string;
		}
	>,
) {
	let intl = useIntl(settingsI18n);
	let [userName, setUserName] = useState(props.userName);

	return (
		<>
			<div className="border-neutral-200/50 rounded-2xl flex items-center border">
				<input
					type="text"
					className="py-3 px-4 text-sm rounded-2xl color-inherit w-full border-none bg-transparent font-[inherit]"
					value={userName}
					onChange={(event) => setUserName(event.target.value)}
					autoFocus
				/>
			</div>

			<Button
				className="mt-5"
				onClick={() => {
					props.close({
						userName,
					});
				}}
				isWide
			>
				{intl.translate('save')}
			</Button>
		</>
	);
}
