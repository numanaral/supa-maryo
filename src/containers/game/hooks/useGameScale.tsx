import { useCallback, useState } from 'react';
import { useOnResize, WindowEvent } from 'hooks';
import { calculateGameScale } from 'game/utils';

/**
 * Scale the size of assets in the game based on the screen size so that things
 * are responsive.
 *
 * @returns Scale multiplier.
 */
const useGameScale = () => {
	const [scale, setScale] = useState(calculateGameScale);
	const onResize = useCallback((e: WindowEvent) => {
		const windowObj = e?.target;
		if (!windowObj) return;
		setScale(calculateGameScale(windowObj));
	}, []);

	useOnResize(onResize);

	return scale;
};

export default useGameScale;
