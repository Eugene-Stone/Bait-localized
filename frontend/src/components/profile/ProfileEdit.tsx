'use client';

import { useState } from 'react';
import ProfileEditData from './ProfileEditData';
import ProfileEditPassword from './ProfileEditPassword';
import { UserExtended } from '@/types';
import { BACKEND_URL } from '@/constants';

type Props = {
	user: UserExtended;
};

export default function ProfileEdit({ user }: Props) {
	const { avatar, username, email } = user;

	const [isEditingData, setIsEditingData] = useState(false);
	const [isEditingPassword, setIsEditingPassword] = useState(false);

	if (isEditingData) {
		return (
			<ProfileEditData
				user={user}
				isEditingData={isEditingData}
				setIsEditingData={setIsEditingData}
			/>
		);
	} else if (isEditingPassword) {
		return (
			<ProfileEditPassword
				user={user}
				isEditingPassword={isEditingPassword}
				setIsEditingPassword={setIsEditingPassword}
			/>
		);
	} else {
		return (
			<div className="nw-auth-form">
				<div className="nw-auth-group">
					<label className="nw-auth-label" htmlFor="profile-firstname">
						Аватар
					</label>
					<img className="nw-auth-image" alt={username} src={BACKEND_URL + avatar?.url} />
				</div>
				<div className="nw-auth-group">
					<label className="nw-auth-label" htmlFor="profile-firstname">
						Никнейм
					</label>
					<strong>{username}</strong>
				</div>
				<div className="nw-auth-group">
					<label className="nw-auth-label" htmlFor="profile-email">
						Электронная почта
					</label>
					<strong>{email}</strong>
				</div>

				<div style={{ display: 'flex', gap: 10 }}>
					<button
						className="nw-auth-button"
						type="button"
						onClick={() => setIsEditingData(true)}>
						Редактировать данные
					</button>
					<button
						className="nw-auth-button"
						type="button"
						onClick={() => setIsEditingPassword(true)}>
						Сменить пароль
					</button>
				</div>
			</div>
		);
	}
}
