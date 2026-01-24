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
			<h1 className="text-center text-2xl leading-none font-semibold">
				{title}
			</h1>

			<h2 className="text-center text-sm font-normal text-gray-500">
				{message}
			</h2>

			{children}
		</Stack>
	);
}
