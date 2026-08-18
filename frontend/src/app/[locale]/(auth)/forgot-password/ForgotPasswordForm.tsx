'use client';

import { forgotPassword, login } from '@/api/api-client';
import { Locale } from '@/i18n/config';
import { Dictionary } from '@/i18n/getDictionary';
import { ForgotPasswordRequest, FormStatus, LoginRequest } from '@/types';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

type Props = {
	localePack: {
		locale: Locale;
		dict: Dictionary;
	};
};
export default function ForgotPasswordForm({ localePack }: Props) {
	const [status, setStatus] = useState<FormStatus>('idle');
	const [serverError, setServerError] = useState('');
	const router = useRouter();

	const { locale, dict } = localePack;

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
		<>
			<form
				className={status === 'loading' ? 'nw-auth-form sending' : 'nw-auth-form'}
				onSubmit={handleSubmit(onSubmit)}
				autoComplete="off">
				<div className="nw-auth-group">
					<label className="nw-auth-label" htmlFor="forgot-email">
						{dict.auth.email}
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
					{dict.auth.resetPassword}
				</button>

				{status === 'success' && (
					<p className="success-field">{dict.auth.resetInstructionsSent}</p>
				)}
				{status === 'error' && (
					<p className="error-field">{serverError || 'Error Message'}</p>
				)}
			</form>
			<div className="nw-auth-links">
				<Link className="nw-auth-link" href={`/${locale}/login`} data-discover="true">
					{dict.auth.backToLogin}
				</Link>
			</div>
		</>
	);
}
