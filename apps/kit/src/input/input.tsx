import { Slot } from '@radix-ui/react-slot';

import { TSlottable } from '@kit/types';

import { cn } from '@kit/utils/classnames';

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
				'w-full px-4 py-3',
				'bg-gray-100',
				'border border-transparent',
				'rounded-2xl',
				'font-[inherit] text-sm text-inherit placeholder:text-gray-500',
				'appearance-none outline-0',
				'transition-colors focus:border-gray-900',
				className,
			)}
			{...props}
		/>
	);
}
