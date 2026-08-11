import { changePassword } from '@/api/api-client';
import { FormStatus, UserExtended } from '@/types';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';

type Props = {
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
	user,
	isEditingPassword,
	setIsEditingPassword,
}: Props) {
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
			<h3 className="nw-password-change-title">Изменение пароля</h3>

			<form
				className={
					status === 'loading'
						? 'nw-password-change-form sending'
						: 'nw-password-change-form'
				}
				onSubmit={handleSubmit(onSubmit)}>
				<div className="nw-password-change-group">
					<label className="nw-password-change-label" htmlFor="password-current">
						Текущий пароль
					</label>
					<input
						{...register('currentPassword', {
							required: 'Обязательное поле',
						})}
						className="nw-password-change-input"
						id="password-current"
						autoComplete="current-password"
						type="password"
					/>
				</div>
				<div className="nw-password-change-group">
					<label className="nw-password-change-label" htmlFor="password-new">
						Новый пароль
					</label>
					<input
						{...register('password', {
							required: 'Обязательное поле',
						})}
						className="nw-password-change-input"
						id="password-new"
						autoComplete="new-password"
						type="password"
					/>
				</div>
				<div className="nw-password-change-group">
					<label className="nw-password-change-label" htmlFor="password-confirm">
						Подтвердите новый пароль
					</label>
					<input
						{...register('passwordConfirmation', {
							required: 'Обязательное поле',
						})}
						className="nw-password-change-input"
						id="password-confirm"
						autoComplete="new-password"
						type="password"
					/>
				</div>

				<div style={{ display: 'flex', gap: 10 }}>
					<button className="nw-auth-button" type="submit">
						Обновить пароль
					</button>
					<button
						className="nw-auth-button"
						type="button"
						onClick={() => setIsEditingPassword(false)}>
						Отмена
					</button>
				</div>
				{status === 'success' && <p className="success-field">Данные успешно изменены</p>}
				{status === 'error' && (
					<p className="error-field">
						{serverError === 'Passwords do not match'
							? 'Пароли не совпадают'
							: serverError === 'The provided current password is invalid'
								? 'Пароль неверный'
								: serverError || 'Возникла ошибка при отправке'}
					</p>
				)}
			</form>
		</>
	);
}
