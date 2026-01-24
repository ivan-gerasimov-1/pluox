import { cn } from '@/web/utils/classnames';

import { Stack } from '@/web/uiKit/layout/layout';
import { Sheet } from '@/web/uiKit/sheet/sheet';

type TNavbarProps = {
	id?: string;
};

export function Navbar({
	id,
	children,
}: React.PropsWithChildren<TNavbarProps>) {
	return (
		<Sheet material="glass" asChild>
			<Stack
				id={id}
				className={cn(
					'right-0 left-0 bottom-0 fixed',
					'gap-0!',
					'px-(--navbar-gap)! pt-(--navbar-gap)! pb-[calc(var(--navbar-gap)*1.5)]!',
					'rounded-tl-3xl! rounded-tr-3xl! rounded-none!',
				)}
			>
				{children}
			</Stack>
		</Sheet>
	);
}
