import { z } from 'zod';

export const leaveCommentSchema = z
	.object({
		data: z.object({
			title: z.string().trim().max(200).optional(),
			text: z.string().trim().min(1).max(5000),
			course: z.number().int().positive(),
		}),
	})
	.strict();

export const updateUserSchema = z
	.object({
		username: z.string().trim().min(2).max(50).optional(),
		email: z.string().trim().email().optional(),
	})
	.strict();
