import { useAuthService } from '@modules/auth/hooks/useAuthService';
import { useNavigation } from '@modules/navigation/useNavigation';
import { usePending } from '@screens/hooks/usePending';
import { delay } from '@utils/delay';
import styles from './logInForm.module.css';
import { EAppPath } from '@root/appPath';
import { Navigable } from '@uiKit/navigable/navigable';

export function useLoginForm() {
	let authService = useAuthService();
	let navigation = useNavigation();

	let { pending, setPending } = usePending();

	async function onSubmit(payload: Record<string, any>) {
		let email = payload.email.value;
		let password = payload.password.value;

		try {
			setPending(true);

			await authService.logIn(email, password);

			navigation.mainPage();
		} catch (error) {
			console.log(error);
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
			<h1>Savee</h1>

			<Form name="signIn" onSubmit={onSubmit}>
				<FormGroup>
					<EmailInput name="email" label="Почта" autoFocus />
				</FormGroup>

				<FormGroup>
					<PasswordInput name="password" label="Пароль" />
				</FormGroup>

				<FormGroup>
					<span>Забыли пароль?</span>

					<br />

					<Navigable to={EAppPath.SIGNIN}>Регистрация</Navigable>
				</FormGroup>

				<FormGroup>
					{!pending ? (
						<button type="submit" className={styles.submitButton}>
							Войти
						</button>
					) : (
						<div>Загрузка…</div>
					)}
				</FormGroup>
			</Form>
		</div>
	);
}

function Form(
	props: React.PropsWithChildren<{
		name: string;
		onSubmit: (payload: Record<string, any>) => void;
	}>,
) {
	function onSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		props.onSubmit(
			// @ts-expect-error
			event.target.elements,
		);
	}

	return (
		<form name={props.name} className={styles.signInForm} onSubmit={onSubmit}>
			{props.children}
		</form>
	);
}

function FormGroup(props: React.PropsWithChildren) {
	return <div className={styles.inputGroup}>{props.children}</div>;
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
