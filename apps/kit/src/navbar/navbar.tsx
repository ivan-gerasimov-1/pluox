import { cn } from '@kit/utils/classnames';

import { Stack } from '@kit/layout/layout';
import { Sheet } from '@kit/sheet/sheet';

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
					'fixed right-0 bottom-0 left-0',
					'gap-0!',
					'px-(--navbar-gap)! pt-(--navbar-gap)! pb-[calc(var(--navbar-gap)*1.5)]!',
					'rounded-none! rounded-tl-3xl! rounded-tr-3xl!',
				)}
			>
				{children}
			</Stack>
		</Sheet>
	);
}
