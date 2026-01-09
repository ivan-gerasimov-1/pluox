import { Stack } from '@root/presentation/web-ui/uiKit/layout/layout';
import { cls } from '@root/presentation/web-ui/utils/classnames';


export function Navbar({ children }: React.PropsWithChildren) {
	return (
		<Stack
			className={cls(
				'gap-0!',
				'left-0 bottom-0 fixed w-full',
				'px-(--navbar-gap) pt-(--navbar-gap) pb-[calc(var(--navbar-gap)*1.5)]',
				'border-neutral-200/50 rounded-tl-2xl rounded-tr-2xl border',
				'backdrop-blur-xs bg-neutral-50/50',
				'z-50',
			)}
		>
			{children}
		</Stack>
	);
}
