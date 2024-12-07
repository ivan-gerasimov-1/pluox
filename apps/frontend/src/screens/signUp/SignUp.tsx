import { EServiceToken } from '@modules/serviceContainer/types';
import { useService } from '@modules/serviceContainer/react/useService';
import { useNavigation } from '@modules/navigation/useNavigation';
import { usePending } from '@screens/hooks/usePending';

import { delay } from '@utils/delay';

import styles from './signUp.module.css';

export function SignUpScreen() {
	let authService = useService(EServiceToken.AUTH_SERVICE);

	const navigation = useNavigation();
	const { pending, setPending } = usePending();

	async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		// @ts-expect-error
		const formElements = event.target.elements;

		const email = formElements.email.value;
		const password = formElements.password.value;

		try {
			setPending(true);

			await authService.signIn(email, password);
			navigation.loginPage();
		} catch (error) {
			console.log(error);
		} finally {
			await delay(500);
			setPending(false);
		}
	}

	return (
		<div className={styles.formContainer}>
			<h1>Savee</h1>

			<h2>Создать аккаунт</h2>

			<form name="signIn" className={styles.signInForm} onSubmit={onSubmit}>
				<label htmlFor="email" className={styles.inputGroup}>
					<div className={styles.label}>Эл. почта</div>

					<input
						type="email"
						id="email"
						name="email"
						className={styles.inputField}
						autoComplete="email"
						autoFocus
					/>
				</label>

				<label htmlFor="password" className={styles.inputGroup}>
					<div className={styles.label}>Пароль</div>

					<input
						type="password"
						id="password"
						name="password"
						className={styles.inputField}
						autoComplete="current-password"
					/>
				</label>

				<div className={styles.inputGroup}>
					{!pending ? (
						<button type="submit" className={styles.submitButton}>
							Зарегистрироваться
						</button>
					) : (
						<div>Регистрация…</div>
					)}
				</div>
			</form>
		</div>
	);
}
