import { memo } from 'react';
import styled, { css } from 'styled-components/macro';
import { useGameState } from 'game/hooks';
import { MAP_HEIGHT, MAPS } from './constants';

const Wrapper = memo(styled.div<{
	$mapBg: string;
	$h: number;
	$w: number;
}>`
	/* To prevent pixel duplication. */
	filter: blur(0.000001px);
	transition: 0.15s linear;
	backface-visibility: hidden;

	${({ $mapBg, $h, $w }) => css`
		background-image: url(${$mapBg});
		background-position: bottom left;
		background-repeat: no-repeat;
		height: ${$h}px;
		width: ${$w}px;
	`}
`);

const GameMap = () => {
	const {
		level: { level },
		view: { scale, width },
		character: { left },
	} = useGameState();

	const windowSize = window.innerWidth / scale;
	const halfWindowSize = windowSize / 2;
	const leftDiff = left - halfWindowSize;
	const maxLeft = width - windowSize;

	const minTranslateX = 0;
	const maxTranslateX = Math.min(leftDiff, maxLeft);
	const translateX = Math.max(minTranslateX, maxTranslateX);

	return (
		<Wrapper
			// translateZ forces the GPU to render the element
			style={{ transform: `translateX(-${translateX}px) translateZ(0)` }}
			className="pixel-art"
			$mapBg={MAPS[level]}
			$h={MAP_HEIGHT * scale}
			$w={width * scale}
		/>
	);
};

export default GameMap;
