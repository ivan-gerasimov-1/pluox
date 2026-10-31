import { useState } from 'react';

import { useIntl } from '@/web/modules/intl/useIntl/useIntl';
import { resetDemo } from '@/web/modules/previews/demoData';
import { previewControlsI18n } from '@/web/modules/previews/previewControls.i18n';

import { Button } from '@kit/button/button';

export function PreviewControls() {
	let intl = useIntl(previewControlsI18n);
	let [failed, setFailed] = useState(false);

	return (
		<aside
			className="border-b border-violet-200 bg-violet-50 px-4 py-2 text-sm text-violet-950"
			aria-label={intl.translate('label')}
		>
			<div className="mx-auto flex max-w-3xl items-center justify-between gap-3">
				<div>
					<strong>{intl.translate('label')}</strong>
					<p className="m-0 text-xs">{intl.translate('description')}</p>
				</div>
				<Button
					size="s"
					onClick={() => {
						if (!window.confirm(intl.translate('confirm'))) return;
						try {
							resetDemo(
								window.localStorage,
								import.meta.env.APP_PREVIEW === 'true',
							);
							window.location.reload();
						} catch {
							setFailed(true);
						}
					}}
				>
					{intl.translate('reset')}
				</Button>
			</div>
			{failed && <p role="alert">{intl.translate('error')}</p>}
		</aside>
	);
}
