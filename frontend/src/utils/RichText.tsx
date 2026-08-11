type Props = {
	className?: string;
	children?: string | null;
};

export default function RichText({ className, children }: Props) {
	if (!children) {
		return;
	}

	return (
		<div
			className={className ? className : ''}
			dangerouslySetInnerHTML={{ __html: children }}
		/>
	);
}
