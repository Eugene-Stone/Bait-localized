import { getMe } from '@/api/api-server';
import Comment from '@/components/Comment';
import { BACKEND_URL } from '@/constants';
import { Comment as CommentType } from '@backend-types/comment';
import { User } from '@backend-types/user';
import { redirect } from 'next/navigation';

async function getComments(userId: number) {
	const response = await fetch(
		`${BACKEND_URL}/api/comments?filters[user][id][$eq]=${userId}&populate=*`,
		{
			next: { revalidate: 600 },
		},
	);

	if (!response.ok) {
		throw new Error('Failed to fetch');
	}
	return response.json();
}

export default async function Comments() {
	const user = await getMe();

	if (!user) {
		redirect('/login');
	}

	const commentsData = await getComments(user.id);
	const comments: CommentType[] = commentsData.data ?? [];

	return comments.length > 0 ? (
		<>
			<h3 className="nw-comments-title" style={{ marginTop: 0 }}>
				Ваши коментарии к курсам
			</h3>
			<ul className="nw-comments-list">
				{comments.map((comment, i) => {
					return <Comment key={i} user={user as User} comment={comment} />;
				})}
			</ul>
		</>
	) : (
		<p>Ты пока не оставил ни одного коментария.</p>
	);
}
