import styled from 'styled-components/macro';
import useGameContext from 'game/hooks/useGameContext';
import { Game } from 'game/types';
import { StyleClassNames } from 'game/constants';
import { MAP_HEIGHT, MAPS } from './constants';

interface Props {
	level: Game.Levels;
}

const Wrapper = styled.div<{ $map: string; $h: number }>`
	${({ $map, $h }) => `
		background-image: url(${$map});
		height: ${$h}px;
	`}
`;

const Map = () => {
	const { level } = useGameContext();
	return (
		<Wrapper
			className={StyleClassNames.PixelArt}
			$map={MAPS[level]}
			$h={MAP_HEIGHT}
		/>
	);
};

export type { Props as MapProps };
export default Map;
