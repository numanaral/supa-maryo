import { memo } from 'react';
import styled, { css } from 'styled-components/macro';
import { useGameState } from 'game/hooks';
import { Game } from 'game/types';
import { MAP_HEIGHT, MAPS } from './constants';
import Scaled from '../Scaled';

interface Props {
	level: Game.Levels;
}

const Wrapper = memo(styled(Scaled)<{
	$mapBg: string;
	$h: number;
}>`
	${({ $mapBg, $h }) => css`
		background-image: url(${$mapBg});
		height: ${$h}px;
	`}
`);

const GameMap = () => {
	const {
		level: { level },
		view: { scale },
	} = useGameState();
	return (
		<Wrapper
			className="pixel-art"
			$mapBg={MAPS[level]}
			$h={MAP_HEIGHT * scale}
		/>
	);
};

export type { Props as GameMapProps };
export default GameMap;
