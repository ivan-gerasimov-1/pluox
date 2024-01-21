import { redirect } from 'react-router-dom';
import styles from './logIn.module.css';
import { AuthService } from '@core/infrastructure/authService/AuthService';
import { useNavigation } from '@modules/navigation/useNavigation';
import { useState } from 'react';

function usePending() {
	const [pending, setPending] = useState<boolean>(false);

	return {
		pending,
		setPending,
	};
}

async function delay(timeoutMs: number = 0): Promise<void> {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(void 0);
		}, timeoutMs);
	});
}

export function LogIn() {
	let authService = AuthService.getInstance();
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
