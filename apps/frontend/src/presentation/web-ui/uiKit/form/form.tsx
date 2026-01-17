import { Input } from '@/presentation/web-ui/uiKit/input/input';
import { Stack } from '@/presentation/web-ui/uiKit/layout/layout';

/** @todo Remove @ts-expect-error and clean up types */
export function Form<T extends {}>({
	className,
	name,
	onSubmit,
	children,
}: React.PropsWithChildren<{
	className?: string;
	name: string;
	onSubmit: (payload: T) => void;
}>) {
	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		let payload: T = {} as T;

		// @ts-expect-error | Use proper types
		for (let element of event.target.elements) {
			Reflect.set(payload, element.name, element.value);
		}

		onSubmit(payload);
	}

	return (
		<Stack className="gap-6" asChild>
			<form name={name} className={className} onSubmit={handleSubmit}>
				{children}
			</form>
		</Stack>
	);
}

export function FormGroup({
	className,
	children,
}: React.PropsWithChildren<{ className?: string }>) {
	return <Stack className={className}>{children}</Stack>;
}

export function FormLabel({
	for: htmlFor,
	text,
	children,
}: React.PropsWithChildren<{
	for?: string;
	text?: string;
}>) {
	return (
		<Stack className="gap-3!" asChild>
			<label htmlFor={htmlFor}>
				{text && (
					<div className="text-sm font-semibold leading-none">{text}</div>
				)}

				{children}
			</label>
		</Stack>
	);
}

export function FormInput({
	name,
	label,
	autoFocus,
	type,
	autoComplete,
	required,
}: {
	type: 'email' | 'password';
	name: string;
	label?: string;
	autoFocus?: boolean;
	autoComplete?: string;
	required?: boolean;
}) {
	return (
		<FormLabel for={name} text={label}>
			<Input
				type={type}
				id={name}
				name={name}
				autoComplete={autoComplete}
				autoFocus={autoFocus}
				required={required}
			/>
		</FormLabel>
	);
}
