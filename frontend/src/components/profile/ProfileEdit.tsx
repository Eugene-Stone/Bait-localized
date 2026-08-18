'use client';

import { useState } from 'react';
import ProfileEditData from './ProfileEditData';
import ProfileEditPassword from './ProfileEditPassword';
import { UserExtended } from '@/types';
import { BACKEND_URL } from '@/constants';
import { Locale } from '@/i18n/config';
import { Dictionary } from '@/i18n/getDictionary';

type Props = {
	localePack: {
		locale: Locale;
		dict: Dictionary;
	};
	user: UserExtended;
};

export default function ProfileEdit({ localePack, user }: Props) {
	const { avatar, username, email } = user;

	const { locale, dict } = localePack;

	const [isEditingData, setIsEditingData] = useState(false);
	const [isEditingPassword, setIsEditingPassword] = useState(false);

	if (isEditingData) {
		return (
			<ProfileEditData
				localePack={localePack}
				user={user}
				isEditingData={isEditingData}
				setIsEditingData={setIsEditingData}
			/>
		);
	} else if (isEditingPassword) {
		return (
			<ProfileEditPassword
				localePack={localePack}
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
						{dict.profile.avatar}
					</label>
					<img className="nw-auth-image" alt={username} src={BACKEND_URL + avatar?.url} />
				</div>
				<div className="nw-auth-group">
					<label className="nw-auth-label" htmlFor="profile-firstname">
						{dict.profile.nickname}
					</label>
					<strong>{username}</strong>
				</div>
				<div className="nw-auth-group">
					<label className="nw-auth-label" htmlFor="profile-email">
						{dict.profile.email}
					</label>
					<strong>{email}</strong>
				</div>

				<div style={{ display: 'flex', gap: 10 }}>
					<button
						className="nw-auth-button"
						type="button"
						onClick={() => setIsEditingData(true)}>
						{dict.profile.editData}
					</button>
					<button
						className="nw-auth-button"
						type="button"
						onClick={() => setIsEditingPassword(true)}>
						{dict.profile.changePassword}
					</button>
				</div>
			</div>
		);
	}
}
