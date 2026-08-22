'use client';

import { resetPassword } from '@/api/api-client';
import { Locale } from '@/i18n/config';
import { Dictionary } from '@/i18n/getDictionary';
import { FormStatus, ResetPasswordForm as ResetPasswordFormType } from '@/types';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, Suspense } from 'react';
import { useForm } from 'react-hook-form';

type Props = {
	localePack: {
		locale: Locale;
		dict: Dictionary;
	};
};

// Каждый клиентский компонент, в котором есть useSearchParams, нужно переписать по следующей схеме — вынести работу с хуком во внутренний подкомпонент и обернуть его в <Suspense>:

// 1. Выносим логику с хуком в отдельный внутренний компонент
function ResetPasswordFormContent({ localePack }: Props) {
	const [status, setStatus] = useState<FormStatus>('idle');
	const [serverError, setServerError] = useState('');
	const router = useRouter();
	const searchParams = useSearchParams();

	const { locale, dict } = localePack;

	const code = searchParams.get('code');

	const {
		register,
		handleSubmit,
		reset,
		watch,
		formState: { errors },
	} = useForm<ResetPasswordFormType>({
		mode: 'onChange',
	});

	const password = watch('password');

	async function onSubmit(dataReset: ResetPasswordFormType) {
		setServerError('');
		setStatus('loading');

		try {
			if (!code) {
				setServerError(dict.auth.invalidResetLink);
				setStatus('error');
				return;
			}

			const dataResetWithCode = { ...dataReset, code };

			await resetPassword(dataResetWithCode);

			setStatus('success');
			setTimeout(() => {
				reset();
				router.push(`/${locale}/login`);
				router.refresh();
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
		<form
			className={status === 'loading' ? 'nw-auth-form sending' : 'nw-auth-form'}
			onSubmit={handleSubmit(onSubmit)}
			autoComplete="off">
			<div className="nw-auth-group">
				<label className="nw-auth-label" htmlFor="reset-password-new">
					{dict.auth.newPassword}
				</label>
				<input
					{...register('password', {
						required: 'This field is required',
						minLength: {
							value: 6,
							message: dict.auth.minCharacters,
						},
					})}
					className="nw-auth-input"
					type="password"
					id="reset-password-new"
				/>
				{errors.password && (
					<span className="error-field">
						{errors.password?.message || 'password field error message.'}
					</span>
				)}
			</div>
			<div className="nw-auth-group">
				<label className="nw-auth-label" htmlFor="reset-password-confirm">
					{dict.auth.confirmPassword}
				</label>
				<input
					{...register('passwordConfirmation', {
						required: 'This field is required',
						validate: (value) => value === password || dict.auth.passwordsDoNotMatch,
					})}
					className="nw-auth-input"
					type="password"
					id="reset-password-confirm"
				/>
				{errors.passwordConfirmation && (
					<span className="error-field">
						{errors.passwordConfirmation?.message ||
							'passwordConfirmation field error message.'}
					</span>
				)}
			</div>
			<button className="nw-auth-button" type="submit">
				{dict.auth.saveChanges}
			</button>

			{status === 'success' && <p className="success-field">{dict.auth.passwordChanged}</p>}
			{status === 'error' && <p className="error-field">{serverError || 'Error Message'}</p>}
		</form>
	);
}

// 2. Основной экспорт оборачиваем в Suspense
export default function ResetPasswordForm({ localePack }: Props) {
	return (
		<Suspense fallback={null}>
			<ResetPasswordFormContent localePack={localePack} />
		</Suspense>
	);
}
