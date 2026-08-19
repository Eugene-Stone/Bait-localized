import { getMe } from '@/api/api-server';
import Comment from '@/components/Comment';
import { BACKEND_URL } from '@/constants';
import { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/getDictionary';
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

type Props = {
	params: Promise<{ locale: Locale }>;
};

export default async function Comments({ params }: Props) {
	const user = await getMe();

	const { locale } = await params;
	const dict = await getDictionary(locale);

	if (!user) {
		redirect(`/${locale}/login`);
	}

	const commentsData = await getComments(user.id);
	const comments: CommentType[] = commentsData.data ?? [];

	return comments.length > 0 ? (
		<div className="nw-profile-content">
			<h3 className="nw-comments-title" style={{ marginTop: 0 }}>
				{dict.comments.yourCourseComments}
			</h3>
			<ul className="nw-comments-list">
				{comments.map((comment, i) => {
					return (
						<Comment
							locale={locale}
							dict={dict}
							key={i}
							user={user as User}
							comment={comment}
						/>
					);
				})}
			</ul>
		</div>
	) : (
		<div className="nw-profile-content">
			<p>{dict.comments.noCommentsYet}.</p>
		</div>
	);
}
