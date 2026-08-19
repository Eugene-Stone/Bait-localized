import sanitizeHtml from 'sanitize-html';

type Props = {
	className?: string;
	children?: string | null;
};

const sanitizeOptions: sanitizeHtml.IOptions = {
	allowedTags: ['p', 'br', 'strong', 'em', 'ul', 'ol', 'li', 'blockquote', 'a', 'h2', 'h3'],
	allowedAttributes: {
		a: ['href', 'target', 'rel'],
	},
	allowedSchemes: ['http', 'https', 'mailto'],
	transformTags: {
		a: sanitizeHtml.simpleTransform('a', {
			rel: 'noopener noreferrer nofollow',
			target: '_blank',
		}),
	},
};

export default function RichText({ className, children }: Props) {
	if (!children) {
		return null;
	}

	const cleanHtml = sanitizeHtml(children, sanitizeOptions);

	return (
		<div
			className={className ? className : ''}
			dangerouslySetInnerHTML={{ __html: cleanHtml }}
		/>
	);
}
