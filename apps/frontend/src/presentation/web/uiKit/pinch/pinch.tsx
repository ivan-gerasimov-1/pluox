import { cn } from '@/presentation/web/utils/classnames';

type TPinchProps = {
	className?: string;
};

export function Pinch({ className }: TPinchProps) {
	return (
		<div
			className={cn(
				className,
				'h-1 rounded-3xl bg-gray-400 -mt-4 mb-6 mx-auto w-[10%]',
			)}
		/>
	);
}
