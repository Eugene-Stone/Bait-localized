import { BACKEND_URL } from '@/constants';

const BASE_URL = `${BACKEND_URL}/api`;

interface RequestOptions extends RequestInit {
	token?: string;
}

export default async function request<T>(endpoint = '/', options: RequestOptions = {}): Promise<T> {
	const url = `${BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

	// Базовые заголовки
	const defaultHeaders: Record<string, string> = {};

	// Если передаем body, принудительно выставляем JSON тип
	if (options.body) {
		defaultHeaders['Content-Type'] = 'application/json';
	}

	// Собираем всё вместе: сначала дефолтные, потом те, что передали вручную (например, Authorization)
	const finalHeaders = {
		...defaultHeaders,
		...options.headers,
	} as HeadersInit;

	const response = await fetch(url, {
		...options,
		headers: finalHeaders,
	});

	if (!response.ok) {
		const error = await response.json().catch(() => ({}));
		throw new Error(error.error?.message ?? `HTTP error: ${response.status}`);
	}

	// Проверяем статус 204 (No Content) или пустой ответ
	if (response.status === 204) {
		return {} as T;
	}

	// Безопасно парсим JSON, только если он есть
	const text = await response.text();
	return text ? JSON.parse(text) : ({} as T);
}
