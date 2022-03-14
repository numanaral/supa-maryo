import { MAP_HEIGHT, TILE_SIZE } from 'game/components';
import { Game } from 'game/types';
import getScaledSize from './getScaledSize';

const getMapConfig = (level: Game.Levels, scale: Game.Scale) => {
	const mapConfig: Record<Game.Levels, Game.MapConfig> = {
		'1-1': {
			characterBottom: getScaledSize(TILE_SIZE * 2, scale),
			characterLeft: 0,
		},
		'1-1-secret': {
			characterBottom: getScaledSize(MAP_HEIGHT - TILE_SIZE * 3, scale),
			characterLeft: getScaledSize(TILE_SIZE * 1.5, scale),
		},
	};

	return mapConfig[level];
};

export default getMapConfig;
