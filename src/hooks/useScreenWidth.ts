import { useState, useEffect } from 'react';

function useScreenWidth() {
	const [screenWidth, setScreenWidth] = useState(
		typeof window !== 'undefined' ? window.innerWidth : 0,
	);

	useEffect(() => {
		if (typeof window === 'undefined') return;

		const handleResize = () => {
			setScreenWidth(window.innerWidth);
		};

		window.addEventListener('resize', handleResize);

		setScreenWidth(window.innerWidth);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	return screenWidth;
}

export default useScreenWidth;
