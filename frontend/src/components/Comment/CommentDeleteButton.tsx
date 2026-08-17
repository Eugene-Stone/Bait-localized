'use client';

import { deleteComment } from '@/api/api-client';
import { Locale } from '@/i18n/config';
import { Dictionary } from '@/i18n/getDictionary';
import { useRouter } from 'next/navigation';

type Props = {
	locale: Locale;
	dict: Dictionary;
	id: string;
	children: React.ReactNode;
};
export default function CommentDeleteButton({ locale, dict, id, children }: Props) {
	const router = useRouter();
	async function removeComment(value: string) {
		try {
			const response = await deleteComment(value);

			setTimeout(() => {
				router.refresh(); // Запрашивает обновленные Server Components у сервера
			}, 500);
		} catch (error) {
			if (error instanceof Error) {
				console.log(error.message);
			}
		}
	}

	function handleDelete() {
		if (confirm(dict.confirm)) {
			removeComment(id);
		}
	}

	return (
		<button className="delete" type="button" onClick={handleDelete}>
			{children}
		</button>
	);
}
