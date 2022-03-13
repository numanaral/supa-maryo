import styled, { css } from 'styled-components/macro';
import { useGameContext } from 'game/hooks';
import { Game } from 'game/types';
import { StyleClassNames } from 'game/constants';
import { MAP_HEIGHT, MAPS } from './constants';
import Scaled from '../Scaled';

interface Props {
	level: Game.Levels;
}

const Wrapper = styled(Scaled)<{
	$mapBg: string;
	$h: number;
}>`
	${({ $mapBg, $h }) => css`
		background-image: url(${$mapBg});
		height: ${$h}px;
	`}
`;

const GameMap = () => {
	const {
		level: { level },
		view: { scale },
	} = useGameContext();
	return (
		<Wrapper
			className={StyleClassNames.PixelArt}
			$mapBg={MAPS[level]}
			$h={MAP_HEIGHT * scale}
		/>
	);
};

export type { Props as GameMapProps };
export default GameMap;
