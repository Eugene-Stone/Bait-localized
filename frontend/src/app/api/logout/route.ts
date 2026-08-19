import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { validateRequestOrigin } from '@/validation/csrf';

export async function POST(request: Request) {
	const originError = validateRequestOrigin(request);
	if (originError) return originError;

	const cookieStore = await cookies();
	cookieStore.delete('jwt');
	cookieStore.delete('jwt_refresh');

	return NextResponse.json({
		success: true,
	});
}
