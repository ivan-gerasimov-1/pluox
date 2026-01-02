import { Slot } from '@radix-ui/react-slot';

import { TSlottable } from '@root/presentation/web-ui/uiKit/types';
import { cls } from '@root/presentation/web-ui/utils/classnames';

type TInputProps = React.InputHTMLAttributes<HTMLInputElement> &
	TSlottable & {
		type?: 'text' | 'number';
	};

export function Input({ className, asChild, ...props }: TInputProps) {
	let Component = asChild ? Slot : 'input';

	return (
		<Component
			className={cls(
				'px-4 py-3 border-neutral-200/50 rounded-2xl text-sm w-full appearance-none border font-[inherit] text-inherit',
				className,
			)}
			{...props}
		/>
	);
}
