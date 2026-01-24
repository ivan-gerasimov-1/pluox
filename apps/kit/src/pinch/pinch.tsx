import { cn } from '@kit/utils/classnames';

type TPinchProps = {
	className?: string;
};

export function Pinch({ className }: TPinchProps) {
	return (
		<div
			className={cn(
				className,
				'mx-auto -mt-4 mb-6 h-1 w-[10%] rounded-3xl bg-gray-400',
			)}
		/>
	);
}
