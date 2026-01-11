import { Slot } from '@radix-ui/react-slot';

import { TSlottable } from '@/presentation/web-ui/uiKit/types';
import { cls } from '@/presentation/web-ui/utils/classnames';

type TInputProps = React.InputHTMLAttributes<HTMLInputElement> &
	TSlottable & {
		ref?: React.Ref<HTMLInputElement>;
		type?: 'text' | 'number' | 'datetime-local' | 'email' | 'password';
	};

export function Input({ className, asChild, ...props }: TInputProps) {
	let Component = asChild ? Slot : 'input';

	return (
		<Component
			className={cls(
				'px-4 py-3 w-full',
				'bg-white',
				'border-neutral-200/50 rounded-2xl border',
				'text-sm placeholder:text-neutral-500 font-[inherit] text-inherit',
				'appearance-none outline-0',
				'focus:border-neutral-900 transition-colors',
				className,
			)}
			{...props}
		/>
	);
}
