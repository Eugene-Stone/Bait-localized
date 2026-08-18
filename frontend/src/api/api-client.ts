import {
	ChangePasswordRequest,
	CommentDataRequest,
	ForgotPasswordRequest,
	RegisterRequest,
	ResetPasswordRequest,
	ReviewDataRequest,
	UpdateProfilePayload,
} from '@/types';
import { stringify } from 'querystring';

export async function registerUser(data: RegisterRequest) {
	const response = await fetch('/api/register', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	});

	const result = await response.json();

	if (!response.ok) {
		throw new Error(result.error?.message ?? 'Registration failed');
	}

	return result;
}

export async function login(identifier: string, password: string) {
	const response = await fetch('/api/login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			identifier,
			password,
		}),
	});

	const data = await response.json();

	if (!response.ok) {
		throw new Error(data.error?.message ?? 'Login error');
	}

	return data;
}

export async function logout() {
	const response = await fetch('/api/logout', {
		method: 'POST',
	});

	if (!response.ok) {
		throw new Error('Logout failed');
	}
}

export async function forgotPassword(dataForgot: ForgotPasswordRequest) {
	const { email } = dataForgot;

	const response = await fetch('/api/forgot-password', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			email,
		}),
	});

	// const data = await response.json();
	const text = await response.text();
	const data = text ? JSON.parse(text) : {};

	if (!response.ok) {
		throw new Error(data.error?.message ?? 'forgot-password error');
	}

	return data;
}

export async function resetPassword(dataReset: ResetPasswordRequest) {
	const { password, passwordConfirmation, code } = dataReset;

	const response = await fetch('/api/reset-password', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			password,
			passwordConfirmation,
			code,
		}),
	});

	// const data = await response.json();
	const text = await response.text();
	const data = text ? JSON.parse(text) : {};

	if (!response.ok) {
		throw new Error(data.error?.message ?? 'reset-password error');
	}

	return data;
}

export async function changePassword(dataPassword: ChangePasswordRequest) {
	const { password, currentPassword, passwordConfirmation } = dataPassword;

	const response = await fetch('/api/change-password', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			password,
			currentPassword,
			passwordConfirmation,
		}),
	});

	const data = await response.json();

	if (!response.ok) {
		throw new Error(data.error?.message ?? 'reset-password error');
	}

	return data;
}

export async function leaveComment(commentData: CommentDataRequest) {
	const response = await fetch('/api/leave-comment', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ data: commentData }),
	});

	const data = await response.json();
	if (!response.ok) {
		throw new Error(data.error?.message ?? 'leave-comment error');
	}

	return data;
}

export async function editComment(commentData: CommentDataRequest, commentId: string) {
	const response = await fetch('/api/edit-comment', {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ data: { ...commentData, isApproved: false }, id: commentId }),
	});

	const data = await response.json();
	if (!response.ok) {
		throw new Error(data.error?.message ?? 'edit-comment error');
	}

	return data;
}

export async function deleteComment(commentId: string) {
	const response = await fetch('/api/delete-comment', {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(commentId),
	});

	const text = await response.text();
	const data = text ? JSON.parse(text) : null;

	if (!response.ok) {
		throw new Error(data.error?.message ?? 'delete-comment error');
	}

	return data;
}

export async function leaveReview(reviewData: ReviewDataRequest) {
	const response = await fetch('/api/leave-review', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ data: reviewData }), // Оборачиваем в data для Strapi
	});

	console.log(reviewData);

	const data = await response.json();
	if (!response.ok) {
		throw new Error(data.error?.message ?? 'leave-Review error');
	}

	return data;
}

export async function editReview(reviewData: ReviewDataRequest, reviewId: string) {
	const response = await fetch('/api/edit-review', {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ data: { ...reviewData, isApproved: false }, id: reviewId }),
	});

	const data = await response.json();
	if (!response.ok) {
		throw new Error(data.error?.message ?? 'edit-review error');
	}

	return data;
}

export async function deleteReview(reviewId: string) {
	const response = await fetch('/api/delete-review', {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(reviewId),
	});

	const text = await response.text();
	const data = text ? JSON.parse(text) : null;

	if (!response.ok) {
		throw new Error(data.error?.message ?? 'delete-review error');
	}

	return data;
}

export async function updateProfile(profileData: UpdateProfilePayload) {
	console.log(profileData);
	const response = await fetch('/api/update-user', {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(profileData),
	});

	const text = await response.text();
	const data = text ? JSON.parse(text) : null;

	if (!response.ok) {
		throw new Error(data.error?.message ?? 'update-user error');
	}

	return data;
}

export async function uploadFile(file: File): Promise<{ id: number; url: string }[]> {
	const formData = new FormData();
	formData.append('files', file);

	// Для файлов НЕЛЬЗЯ ставить заголовок Content-Type вручную (браузер сделает это сам)
	const response = await fetch('/api/upload-file', {
		method: 'POST',
		headers: {
			// Никаких 'Content-Type': 'application/json' тут быть не должно!
		},
		body: formData,
	});

	const data = await response.json();

	if (!response.ok) {
		throw new Error(data.error?.message ?? 'Ошибка загрузки файла');
	}

	return data;
}
