'use client';

import { login } from '@/api/api-client';
import { Locale } from '@/i18n/config';
import { Dictionary } from '@/i18n/getDictionary';
import { FormStatus, LoginRequest } from '@/types';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';
import { useForm } from 'react-hook-form';

type Props = {
	localePack: {
		locale: Locale;
		dict: Dictionary;
	};
};

// Каждый клиентский компонент, в котором есть useSearchParams, нужно переписать по следующей схеме — вынести работу с хуком во внутренний подкомпонент и обернуть его в <Suspense>:

// 1. Выносим логику с хуком в отдельный внутренний компонент
function LoginFormContent({ localePack }: Props) {
	const [status, setStatus] = useState<FormStatus>('idle');
	const [serverError, setServerError] = useState('');

	const { locale, dict } = localePack;

	const router = useRouter();
	const searchParams = useSearchParams();

	// Получаем callbackUrl из строки запроса (?callbackUrl=...)
	const callbackUrl = searchParams.get('callbackUrl');

	const {
		register,
		handleSubmit,
		reset,
		setError,
		formState: { errors, isValid },
	} = useForm<LoginRequest>({
		mode: 'onChange',
	});

	async function onSubmit(dataAuth: LoginRequest) {
		setServerError('');
		setStatus('loading');

		const { identifier, password } = dataAuth;

		try {
			const response = await login(identifier, password);

			// console.log(dataAuth);
			// console.log(response);

			setTimeout(() => {
				reset();

				// Если callbackUrl передан — идем по нему, иначе по умолчанию в профиль
				const targetUrl = callbackUrl || `/${locale}/profile/info`;

				router.push(targetUrl);

				router.refresh();
				setStatus('success');
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
				onSubmit={handleSubmit(onSubmit)}>
				<div className="nw-auth-group">
					<label className="nw-auth-label" htmlFor="login-email">
						{dict.auth.email}
					</label>
					<input
						{...register('identifier', {
							required: 'This field is required',
						})}
						className="nw-auth-input"
						type="email"
						id="login-email"
						autoComplete="email"
					/>
					{errors.identifier && (
						<span className="error-field">
							{errors.identifier?.message || `identifier field error message.`}
						</span>
					)}
				</div>
				<div className="nw-auth-group">
					<label className="nw-auth-label" htmlFor="login-password">
						{dict.auth.password}
					</label>
					<input
						{...register('password', {
							required: 'This field is required',
						})}
						className="nw-auth-input"
						type="password"
						id="login-password"
						autoComplete="current-password"
					/>
					{errors.password && (
						<span className="error-field">
							{errors.password?.message || `identifier field error message.`}
						</span>
					)}
				</div>
				<button className="nw-auth-button" type="submit">
					{dict.auth.signIn}
				</button>

				{status === 'success' && <p className="success-field">Success Message</p>}
				{status === 'error' && (
					<p className="error-field">{serverError || 'Error Message'}</p>
				)}
			</form>
			<div className="nw-auth-links">
				<Link
					className="nw-auth-link"
					href={`/${locale}/forgot-password`}
					data-discover="true">
					{dict.auth.forgotPassword}
				</Link>
				<Link
					className="nw-auth-link"
					href={`/${locale}/registration`}
					data-discover="true">
					{dict.auth.createAccount}
				</Link>
			</div>
		</>
	);
}

// 2. Основной экспорт оборачиваем в Suspense
export default function LoginForm({ localePack }: Props) {
	return (
		<Suspense fallback={null}>
			<LoginFormContent localePack={localePack} />
		</Suspense>
	);
}
