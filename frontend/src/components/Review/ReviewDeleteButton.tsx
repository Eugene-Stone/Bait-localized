'use client';

import { deleteReview } from '@/api/api-client';
import { useRouter } from 'next/navigation';
import Modal from '../Modal';
import { useState } from 'react';

type Props = {
	id: string;
};
export default function ReviewDeleteButton({ id }: Props) {
	const router = useRouter();
	const [isOpen, setIsOpen] = useState(false);

	async function removeReview(value: string) {
		try {
			const response = await deleteReview(value);

			setTimeout(() => {
				router.refresh(); // Запрашивает обновленные Server Components у сервера
			}, 500);
		} catch (error) {
			if (error instanceof Error) {
				console.log(error.message);
			}
		}
	}

	const handleDelete = () => {
		removeReview(id);
		setIsOpen(false);
		// console.log('удалено', id);
	};

	return (
		<Modal
			title="Удалить отзыв"
			open={isOpen}
			onOpenChange={(value) => {
				setIsOpen(value);
			}}
			trigger={
				<button className="delete" type="button" onClick={() => setIsOpen(true)}>
					X
				</button>
			}>
			<p>Вы уверены, что хотите удалить этот отзыв?</p>

			<div className="modal-actions" style={{ display: 'flex', gap: 10 }}>
				<button
					className="nw-comment-submit-button"
					type="button"
					onClick={() => setIsOpen(false)}>
					Отмена
				</button>
				<button className="nw-comment-submit-button" type="button" onClick={handleDelete}>
					Удалить
				</button>
			</div>
		</Modal>
	);
}
