'use client';

import { deleteReview } from '@/api/api-client';
import { useRouter } from 'next/navigation';
import Modal from '../Modal';
import { useState } from 'react';
import { Locale } from '@/i18n/config';
import { Dictionary } from '@/i18n/getDictionary';

type Props = {
	localePack: {
		locale: Locale;
		dict: Dictionary;
	};
	children: React.ReactNode;
	id: string;
};
export default function ReviewDeleteButton({ id, localePack, children }: Props) {
	const router = useRouter();
	const [isOpen, setIsOpen] = useState(false);

	const { locale, dict } = localePack;
	console.log(children);

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
			title={children as string}
			open={isOpen}
			onOpenChange={(value) => {
				setIsOpen(value);
			}}
			trigger={
				<button className="delete" type="button" onClick={() => setIsOpen(true)}>
					X
				</button>
			}>
			<p>{dict.reviews.deleteConfirmation}</p>

			<div className="modal-actions" style={{ display: 'flex', gap: 10 }}>
				<button
					className="nw-comment-submit-button"
					type="button"
					onClick={() => setIsOpen(false)}>
					{dict.reviews.cancel}
				</button>
				<button className="nw-comment-submit-button" type="button" onClick={handleDelete}>
					{dict.reviews.delete}
				</button>
			</div>
		</Modal>
	);
}
