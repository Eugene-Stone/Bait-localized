'use client';

import { forgotPassword, login } from '@/api/api-client';
import { ForgotPasswordRequest, FormStatus, LoginRequest } from '@/types';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function ForgotPassword() {
	const [status, setStatus] = useState<FormStatus>('idle');
	const [serverError, setServerError] = useState('');
	const router = useRouter();

	const {
		register,
		handleSubmit,
		reset,
		setError,
		formState: { errors, isValid },
	} = useForm<ForgotPasswordRequest>({
		mode: 'onChange',
	});

	async function onSubmit(dataForgot: ForgotPasswordRequest) {
		setServerError('');
		setStatus('loading');

		try {
			const response = await forgotPassword(dataForgot);

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
				<h2 className="nw-auth-title">Восстановление пароля</h2>
				<form
					className={status === 'loading' ? 'nw-auth-form sending' : 'nw-auth-form'}
					onSubmit={handleSubmit(onSubmit)}
					autoComplete="off">
					<div className="nw-auth-group">
						<label className="nw-auth-label" htmlFor="forgot-email">
							Электронная почта
						</label>
						<input
							{...register('email', {
								required: 'This field is required',
							})}
							className="nw-auth-input"
							id="forgot-email"
							type="email"
						/>
						{errors.email && (
							<span className="error-field">
								{errors.email?.message || `email field error message.`}
							</span>
						)}
					</div>
					<button className="nw-auth-button" type="submit">
						Сбросить пароль
					</button>

					{status === 'success' && (
						<p className="success-field">
							Если аккаунт с такой электронной почтой существует, мы отправили
							инструкции для восстановления пароля.
						</p>
					)}
					{status === 'error' && (
						<p className="error-field">{serverError || 'Error Message'}</p>
					)}
				</form>
				<div className="nw-auth-links">
					<Link className="nw-auth-link" href="/login" data-discover="true">
						Вернуться к авторизации
					</Link>
				</div>
			</div>
		</section>
	);
}
