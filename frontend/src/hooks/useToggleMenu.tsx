import { useState } from 'react';

export default function useToggleMenu() {
	const [open, setOpen] = useState(false);
	return { open, setOpen };
}
