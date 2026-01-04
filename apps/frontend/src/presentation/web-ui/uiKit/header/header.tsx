import { ELocaleCode } from '@root/core/modules/intl/domain/enums';

import { useTitle } from '@root/presentation/web-ui/uiKit/header/hooks/useTitle';
import { cls } from '@root/presentation/web-ui/utils/classnames';

export type THeaderProps = {
	title: { [ELocaleCode.EN_US]: string; [ELocaleCode.RU_RU]: string };
};

export function Header(props: THeaderProps) {
	const title = useTitle(props);

	return (
		<div
			className={cls(
				'inset-x-0 top-0 fixed',
				'flex items-center justify-between',
				'h-(--header-height)',
				'px-4 py-1',
				'backdrop-blur-xs bg-neutral-50/50',
				'border-neutral-200/50 border border-t-0',
				'rounded-b-2xl',
				'z-1',
			)}
		>
			<h1 className="text-base tracking-tight capitalize">{title}</h1>
		</div>
	);
}
