import { useEffect, type RefObject } from 'react';

interface UseClickOutsideProps {
	ref: RefObject<HTMLDivElement | null>;
	open: boolean;
	onClose: () => void;
}

export const useClickOutside = ({ ref, open, onClose }: UseClickOutsideProps) => {
	useEffect(() => {
		if (!open) return;

		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as Node;

			if (ref.current && !ref.current.contains(target)) {
				onClose();
			}
		};

		const handleEscapePress = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				onClose();
			}
		};

		document.addEventListener('click', handleClickOutside);
		window.addEventListener('keydown', handleEscapePress);

		return () => {
			document.removeEventListener('click', handleClickOutside);
			window.removeEventListener('keydown', handleEscapePress);
		};
	}, [open, ref, onClose]);
};
