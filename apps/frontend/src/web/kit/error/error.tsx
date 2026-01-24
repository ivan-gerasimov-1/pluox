import { Stack } from '@kit/layout/layout';

type TErrorProps = {
	title: string;
	message: string;
};

export function Error({
	title,
	message,
	children,
}: React.PropsWithChildren<TErrorProps>) {
	return (
		<Stack>
			<h1 className="font-semibold text-2xl text-center leading-none">
				{title}
			</h1>

			<h2 className="text-sm text-gray-500 font-normal text-center">
				{message}
			</h2>

			{children}
		</Stack>
	);
}
