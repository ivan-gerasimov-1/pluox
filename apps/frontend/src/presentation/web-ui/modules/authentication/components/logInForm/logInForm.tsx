import { EAppPath } from '@root/presentation/web-ui/appPath';
import { useAppNavigation } from '@root/presentation/web-ui/hooks/useNavigation';
import { usePending } from '@root/presentation/web-ui/hooks/usePending';
import { EServiceToken } from '@root/presentation/web-ui/modules/serviceContainer/enums';
import { useService } from '@root/presentation/web-ui/modules/serviceContainer/useService';
import { AppLink } from '@root/presentation/web-ui/uiKit/appLink/appLink';
import { Button } from '@root/presentation/web-ui/uiKit/button/button';
import { cls } from '@root/presentation/web-ui/utils/classnames';
import { delay } from '@root/presentation/web-ui/utils/delay';

import styles from './logInForm.module.css';

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
		<div className={styles.formContainer}>
			<h1 className={styles.title}>Pluox</h1>

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
						<Button
							type="submit"
							className={styles.submitButton}
							onClick={() =>
								// eslint-disable-next-line no-empty-function
								{}
							}
						>
							Войти
						</Button>
					)}
				</FormGroup>

				<FormGroup className="mt-10">
					<div className="gap-1 text-sm flex items-center justify-center">
						Нет аккаунта?
						<AppLink className="text-indigo-600" to={EAppPath.SIGN_UP}>
							Создать
						</AppLink>
					</div>
				</FormGroup>
			</Form>
		</div>
	);
}

function Form<T>(
	props: React.PropsWithChildren<{
		name: string;
		onSubmit: (payload: T) => void;
	}>,
) {
	function onSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		props.onSubmit(
			/** @todo Remove @ts-expect-error */
			// @ts-expect-error | Use proper types
			event.target.elements,
		);
	}

	return (
		<form name={props.name} className={styles.form} onSubmit={onSubmit}>
			{props.children}
		</form>
	);
}

function FormGroup(props: React.PropsWithChildren<{ className?: string }>) {
	return (
		<div className={cls(props.className, styles.inputGroup)}>
			{props.children}
		</div>
	);
}

function InputLabel(
	props: React.PropsWithChildren<{
		for?: string;
		text?: string;
	}>,
) {
	return (
		<label htmlFor={props.for} className={styles.label}>
			{props.text && <div className={styles.labelText}>{props.text}</div>}

			{props.children}
		</label>
	);
}

function Input(props: {
	type: 'text' | 'email' | 'password';
	name: string;
	label?: string;
	autoComplete?: string;
	autoFocus?: boolean;
}) {
	return (
		<InputLabel for={props.name} text={props.label}>
			<input
				type={props.type}
				id={props.name}
				name={props.name}
				className={styles.inputField}
				autoComplete={props.autoComplete}
				autoFocus={props.autoFocus}
			/>
		</InputLabel>
	);
}

function EmailInput(props: {
	name: string;
	label?: string;
	autoFocus?: boolean;
}) {
	return (
		<Input
			type="email"
			name={props.name}
			label={props.label}
			autoComplete="email"
			autoFocus={props.autoFocus}
		/>
	);
}

function PasswordInput(props: {
	name: string;
	label?: string;
	autoFocus?: boolean;
}) {
	return (
		<Input
			type="password"
			name={props.name}
			label={props.label}
			autoComplete="current-password"
			autoFocus={props.autoFocus}
		/>
	);
}
