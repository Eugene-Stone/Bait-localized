'use client';

import { deleteComment } from '@/api/api-client';
import { useRouter } from 'next/navigation';

type Props = {
	id: string;
};
export default function CommentDeleteButton({ id }: Props) {
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
		if (confirm('Вы уверены?')) {
			removeComment(id);
		}
	}

	return (
		<button className="delete" type="button" onClick={handleDelete}>
			Удалить
		</button>
	);
}
