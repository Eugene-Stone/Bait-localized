'use client';

import { registerUser } from '@/api/api-client';
import { FormStatus, RegisterRequest } from '@/types';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function Registration() {
	const [status, setStatus] = useState<FormStatus>('idle');
	const [serverError, setServerError] = useState('');
	const router = useRouter();

	const {
		register,
		handleSubmit,
		reset,
		setError,
		formState: { errors, isValid },
	} = useForm<RegisterRequest>({
		mode: 'onChange',
	});

	async function onSubmit(dataAuth: RegisterRequest) {
		setServerError('');
		setStatus('loading');

		try {
			console.log(dataAuth);
			const response = await registerUser(dataAuth);

			setStatus('success');
			setTimeout(() => {
				reset();
				// router.push(`/profile/info`);
				// router.refresh();
			}, 500);
		} catch (error) {
			if (error instanceof Error) {
				setServerError(error.message);
				console.log(error.message);
			}

			setStatus('error');
		}
	}

	return (
		<section className="nw-auth-section">
			<div className="nw-auth-container">
				<h2 className="nw-auth-title">Регистрация</h2>
				<form
					className={status === 'loading' ? 'nw-auth-form sending' : 'nw-auth-form'}
					onSubmit={handleSubmit(onSubmit)}
					autoComplete="off">
					<div className="nw-auth-group">
						<label className="nw-auth-label" htmlFor="register-name">
							Имя
						</label>
						<input
							{...register('username', {
								required: 'This field is required',
							})}
							className="nw-auth-input"
							id="register-name"
							type="text"
							autoComplete="username"
						/>
						{errors.username && (
							<span className="error-field">
								{errors.username?.message || `username field error message.`}
							</span>
						)}
					</div>
					<div className="nw-auth-group">
						<label className="nw-auth-label" htmlFor="register-email">
							Электронная почта
						</label>
						<input
							{...register('email', {
								required: 'This field is required',
							})}
							className="nw-auth-input"
							id="register-email"
							type="email"
							autoComplete="email"
						/>
						{errors.email && (
							<span className="error-field">
								{errors.email?.message || `email field error message.`}
							</span>
						)}
					</div>
					<div className="nw-auth-group">
						<label className="nw-auth-label" htmlFor="register-password">
							Пароль
						</label>
						<input
							{...register('password', {
								required: 'This field is required',
							})}
							className="nw-auth-input"
							id="register-password"
							type="password"
							autoComplete="new-password"
						/>
						{errors.password && (
							<span className="error-field">
								{errors.password?.message || `password field error message.`}
							</span>
						)}
					</div>
					<button className="nw-auth-button" type="submit">
						Зарегистрироваться
					</button>

					{status === 'success' && (
						<p className="success-field">Проверьте почту и подтвердите регистрацию</p>
					)}
					{status === 'error' && (
						<p className="error-field">{serverError || 'Error Message'}</p>
					)}
				</form>
				<div className="nw-auth-links">
					<Link className="nw-auth-link" href="/login" data-discover="true">
						Уже есть аккаунт? Войти
					</Link>
				</div>
			</div>
		</section>
	);
}
