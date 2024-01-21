import styles from './signIn.module.css';
import { AuthService } from '@core/infrastructure/authService/AuthService';

export function SignIn() {
	let authService = AuthService.getInstance();

	function onSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		// @ts-expect-error
		const formElements = event.target.elements;

		const email = formElements.email.value;
		const password = formElements.password.value;

		authService.signIn(email, password);
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
					<button type="submit" className={styles.submitButton}>
						Зарегистрироваться
					</button>
				</div>
			</form>
		</div>
	);
}
