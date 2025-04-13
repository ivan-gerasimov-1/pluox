import { EAppPath } from '@root/presentation/web-ui/appPath';

import { useAppNavigation } from '@root/presentation/web-ui/hooks/useNavigation';
import { useService } from '@root/presentation/web-ui/modules/serviceContainer/useService';
import { EServiceToken } from '@root/presentation/web-ui/modules/serviceContainer/enums';

import { usePending } from '@root/presentation/web-ui/hooks/usePending';

import { delay } from '@root/presentation/web-ui/utils/delay';

import { AppLink } from '@root/presentation/web-ui/uiKit/appLink/appLink';
import { Button } from '@root/presentation/web-ui/uiKit/button/button';

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
			<h1 className={styles.title}>Savee</h1>

			<Form name="signIn" onSubmit={onSubmit}>
				<FormGroup>
					<EmailInput name="email" label="Почта" autoFocus />
				</FormGroup>

				<FormGroup>
					<PasswordInput name="password" label="Пароль" />
					<span
						style={{
							fontSize: 'var(--fs-100)',
							marginBlockStart: '7.5px',
							textAlign: 'right',
							userSelect: 'none',
							cursor: 'pointer',
						}}
					>
						Забыли пароль?
					</span>
				</FormGroup>

				<FormGroup>
					{!pending ? (
						<Button
							type="submit"
							className={styles.submitButton}
							onClick={() => {}}
						>
							Войти
						</Button>
					) : (
						<div>Загрузка…</div>
					)}
				</FormGroup>

				<br />
				<br />
				<br />

				<FormGroup>
					<div
						style={{
							fontSize: 'var(--fs-100)',
							textAlign: 'center',
						}}
					>
						Нет аккаунта?{' '}
						<AppLink to={EAppPath.SIGN_UP}>
							<span
								style={{
									color: 'rgb(66, 66, 190)',
								}}
							>
								Создать
							</span>
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
