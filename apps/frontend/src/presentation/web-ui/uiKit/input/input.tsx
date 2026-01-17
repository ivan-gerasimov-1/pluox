import { Slot } from '@radix-ui/react-slot';

import { TSlottable } from '@/presentation/web-ui/uiKit/types';
import { cn } from '@/presentation/web-ui/utils/classnames';

type TInputProps = React.InputHTMLAttributes<HTMLInputElement> &
	TSlottable & {
		ref?: React.Ref<HTMLInputElement>;
		type?: 'text' | 'number' | 'datetime-local' | 'email' | 'password';
	};

export function Input({ className, asChild, ...props }: TInputProps) {
	let Component = asChild ? Slot : 'input';

	return (
		<Component
			className={cn(
				'px-4 py-3 w-full',
				'bg-neutral-50',
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
