'use client';

import { updateProfile, uploadFile } from '@/api/api-client';
import { FormStatus, UpdateProfilePayload, UserExtended } from '@/types';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';

type Props = {
	user: UserExtended;
	isEditingData: boolean;
	setIsEditingData: Dispatch<SetStateAction<boolean>>;
};

type FormValues = {
	username: string;
	email: string;
	avatarFile?: FileList;
};

export default function ProfileEditData({ user, isEditingData, setIsEditingData }: Props) {
	const router = useRouter();
	const { avatar, username, email } = user;

	const [status, setStatus] = useState<FormStatus>();
	const [serverError, setServerError] = useState('');

	const {
		register,
		handleSubmit,
		reset,
		formState: { isValid, isDirty, errors },
	} = useForm<FormValues>({
		mode: 'onChange',
		defaultValues: {
			username: username,
			email: email,
		},
	});

	async function onSubmit(formData: FormValues) {
		setServerError('');
		setStatus('loading');

		// Объект, который полетит в PUT-запрос
		const payloadData: UpdateProfilePayload = {
			userId: user.id!,
			username: formData.username,
			email: formData.email,
		};

		console.log(payloadData);

		try {
			// Проверяем, прикрепил ли пользователь файл
			if (formData.avatarFile && formData.avatarFile.length > 0) {
				const file = formData.avatarFile[0];
				console.log('прикреплен файл');
				// 1. Грузим файл на сервер Strapi
				const uploadResult = await uploadFile(file);

				// 2. Забираем ID загруженного медиафайла и пишем в payloadData
				if (uploadResult && uploadResult[0]) {
					payloadData.avatar = uploadResult[0].id;
				}
			}

			await updateProfile(payloadData);

			setStatus('success');
			router.refresh(); // Запрашивает обновленные Server Components у сервера
			setTimeout(() => {
				setIsEditingData(false);
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
			onSubmit={handleSubmit(onSubmit)}>
			<div className="nw-auth-group">
				<label className="nw-auth-label">Новый аватар</label>
				<input {...register('avatarFile')} accept="image/*" type="file" />
			</div>
			<div className="nw-auth-group">
				<label className="nw-auth-label" htmlFor="profile-firstname">
					Никнейм
				</label>
				<input
					{...register('username', {
						required: 'Обязательное поле',
					})}
					className="nw-auth-input"
					id="profile-firstname"
					required
					type="text"
				/>
				{errors.username && (
					<span className="error-field">
						{errors.username?.message || 'Возникла ошибка'}
					</span>
				)}
			</div>
			<div className="nw-auth-group">
				<label className="nw-auth-label" htmlFor="profile-email">
					Электронная почта
				</label>
				<input
					{...register('email', {
						required: 'Обязательное поле',
					})}
					className="nw-auth-input"
					id="profile-email"
					autoComplete="email"
					type="email"
				/>
				{errors.email && (
					<span className="error-field">
						{errors.email?.message || 'Возникла ошибка'}
					</span>
				)}
			</div>

			<div style={{ display: 'flex', gap: 10 }}>
				<button className="nw-auth-button" type="submit">
					Сохранить данные
				</button>
				<button
					className="nw-auth-button"
					type="button"
					onClick={() => setIsEditingData(false)}>
					Отмена
				</button>
			</div>

			{status === 'success' && <p className="success-field">Данные успешно изменены</p>}
			{status === 'error' && <p className="error-field">Возникла ошибка при отправке</p>}
		</form>
	);
}
