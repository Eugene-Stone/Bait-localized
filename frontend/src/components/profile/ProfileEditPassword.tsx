import { changePassword } from '@/api/api-client';
import { Locale } from '@/i18n/config';
import { Dictionary } from '@/i18n/getDictionary';
import { FormStatus, UserExtended } from '@/types';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';

type Props = {
	localePack: {
		locale: Locale;
		dict: Dictionary;
	};
	user: UserExtended;
	isEditingPassword: boolean;
	setIsEditingPassword: Dispatch<SetStateAction<boolean>>;
};

type FormValues = {
	password: string;
	currentPassword: string;
	passwordConfirmation: string;
};

export default function ProfileEditPassword({
	localePack,
	user,
	isEditingPassword,
	setIsEditingPassword,
}: Props) {
	const { locale, dict } = localePack;

	const router = useRouter();
	const [status, setStatus] = useState<FormStatus>();
	const [serverError, setServerError] = useState('');

	const {
		register,
		handleSubmit,
		reset,
		formState: { isValid, isDirty, errors },
	} = useForm<FormValues>({
		mode: 'onChange',
	});

	async function onSubmit(formData: FormValues) {
		setServerError('');
		setStatus('loading');

		console.log(formData);

		try {
			await changePassword(formData);

			setStatus('success');
			router.refresh(); // Запрашивает обновленные Server Components у сервера
			setTimeout(() => {
				setIsEditingPassword(false);
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
			<h3 className="nw-password-change-title">{dict.profile.changePassword}</h3>

			<form
				className={
					status === 'loading'
						? 'nw-password-change-form sending'
						: 'nw-password-change-form'
				}
				onSubmit={handleSubmit(onSubmit)}>
				<div className="nw-password-change-group">
					<label className="nw-password-change-label" htmlFor="password-current">
						{dict.profile.currentPassword}
					</label>
					<input
						{...register('currentPassword', {
							required: dict.profile.requiredField,
						})}
						className="nw-password-change-input"
						id="password-current"
						autoComplete="current-password"
						type="password"
					/>
				</div>
				<div className="nw-password-change-group">
					<label className="nw-password-change-label" htmlFor="password-new">
						{dict.profile.newPassword}
					</label>
					<input
						{...register('password', {
							required: dict.profile.requiredField,
						})}
						className="nw-password-change-input"
						id="password-new"
						autoComplete="new-password"
						type="password"
					/>
				</div>
				<div className="nw-password-change-group">
					<label className="nw-password-change-label" htmlFor="password-confirm">
						{dict.profile.confirmNewPassword}
					</label>
					<input
						{...register('passwordConfirmation', {
							required: dict.profile.requiredField,
						})}
						className="nw-password-change-input"
						id="password-confirm"
						autoComplete="new-password"
						type="password"
					/>
				</div>

				<div style={{ display: 'flex', gap: 10 }}>
					<button className="nw-auth-button" type="submit">
						{dict.profile.updatePassword}
					</button>
					<button
						className="nw-auth-button"
						type="button"
						onClick={() => setIsEditingPassword(false)}>
						{dict.profile.cancel}
					</button>
				</div>
				{status === 'success' && (
					<p className="success-field">{dict.profile.dataUpdatedSuccessfully}</p>
				)}
				{status === 'error' && (
					<p className="error-field">
						{serverError === 'Passwords do not match'
							? dict.profile.passwordsDoNotMatch
							: serverError === 'The provided current password is invalid'
								? dict.profile.incorrectPassword
								: serverError || dict.profile.sendErrorOccurred}
					</p>
				)}
			</form>
		</>
	);
}
