import { EAppPath } from '@/presentation/web-ui/appPath';
import { useAppNavigation } from '@/presentation/web-ui/hooks/useNavigation';
import { usePending } from '@/presentation/web-ui/hooks/usePending';
import { EServiceToken } from '@/presentation/web-ui/modules/serviceContainer/enums';
import { useService } from '@/presentation/web-ui/modules/serviceContainer/useService';
import { AppLink } from '@/presentation/web-ui/uiKit/appLink/appLink';
import { Button } from '@/presentation/web-ui/uiKit/button/button';
import { Input } from '@/presentation/web-ui/uiKit/input/input';
import { Stack } from '@/presentation/web-ui/uiKit/layout/layout';
import { cn } from '@/presentation/web-ui/utils/classnames';
import { delay } from '@/presentation/web-ui/utils/delay';

export function useLoginForm() {
	let authService = useService(EServiceToken.AUTH_SERVICE);
	let navigation = useAppNavigation();

	let { pending, setPending } = usePending();

	async function onSubmit(payload: {
		email: {
			value: string;
		};
		password: {
			value: string;
		};
	}) {
		let email = payload.email.value;
		let password = payload.password.value;

		try {
			setPending(true);

			await authService.logIn(email, password);

			navigation.mainPage();
		} finally {
			await delay(500);

			setPending(false);
		}
	}

	return {
		pending,
		onSubmit,
	};
}

export function LogInForm() {
	let { onSubmit, pending } = useLoginForm();

	return (
		<Stack className="px-10 py-15 w-96 rounded-3xl border-neutral-200/50 max-w-full border shadow-(--box-shadow-100)">
			<h1 className="text-2xl font-semibold">Pluox</h1>

			<Form name="signIn" onSubmit={onSubmit}>
				<FormGroup>
					<EmailInput name="email" label="Почта" autoFocus />
				</FormGroup>

				<FormGroup>
					<PasswordInput name="password" label="Пароль" />
					<span className="mt-2 text-sm text-right">Забыли пароль?</span>
				</FormGroup>

				<FormGroup>
					{pending ? (
						<div>Загрузка…</div>
					) : (
						<Button type="submit">Войти</Button>
					)}
				</FormGroup>

				<FormGroup className="mt-10">
					<Stack className="gap-1! text-sm flex-row items-center justify-center">
						Нет аккаунта?
						<AppLink className="text-indigo-600" to={EAppPath.SIGN_UP}>
							Создать
						</AppLink>
					</Stack>
				</FormGroup>
			</Form>
		</Stack>
	);
}

function Form<T>({
	name,
	onSubmit,
	children,
}: React.PropsWithChildren<{
	name: string;
	onSubmit: (payload: T) => void;
}>) {
	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		onSubmit(
			/** @todo Remove @ts-expect-error */
			// @ts-expect-error | Use proper types
			event.target.elements,
		);
	}

	return (
		<form name={name} className="mt-10 flex flex-col" onSubmit={handleSubmit}>
			{children}
		</form>
	);
}

function FormGroup({
	className,
	children,
}: React.PropsWithChildren<{ className?: string }>) {
	return (
		<div className={cn('[&+&]:mt-5 flex flex-col', className)}>{children}</div>
	);
}

function InputLabel({
	for: htmlFor,
	text,
	children,
}: React.PropsWithChildren<{
	for?: string;
	text?: string;
}>) {
	return (
		<label htmlFor={htmlFor} className="*:mt-3 flex flex-col">
			{text && <div className="text-sm font-semibold mt-0!">{text}</div>}

			{children}
		</label>
	);
}

function EmailInput({
	name,
	label,
	autoFocus,
}: {
	name: string;
	label?: string;
	autoFocus?: boolean;
}) {
	return (
		<InputLabel for={name} text={label}>
			<Input
				type="email"
				id={name}
				name={name}
				autoComplete="email"
				autoFocus={autoFocus}
			/>
		</InputLabel>
	);
}

function PasswordInput({
	name,
	label,
	autoFocus,
}: {
	name: string;
	label?: string;
	autoFocus?: boolean;
}) {
	return (
		<InputLabel for={name} text={label}>
			<Input
				type="password"
				id={name}
				name={name}
				autoComplete="current-password"
				autoFocus={autoFocus}
			/>
		</InputLabel>
	);
}
