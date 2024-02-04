import { useAuthService } from '@modules/auth/hooks/useAuthService';
import { useNavigation } from '@modules/navigation/useNavigation';
import { usePending } from '@screens/hooks/usePending';
import { delay } from '@utils/delay';
import styles from './logInForm.module.css';

export function LogInForm() {
	let authService = useAuthService();
	let navigation = useNavigation();

	let { pending, setPending } = usePending();

	async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		// @ts-expect-error
		let formElements = event.target.elements;

		let email = formElements.email.value;
		let password = formElements.password.value;

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

	return (
		<div className={styles.formContainer}>
			<h1>Savee</h1>

			<h2>Войти</h2>

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
							Войти
						</button>
					) : (
						<div>Загрузка…</div>
					)}
				</div>
			</form>
		</div>
	);
}
