import { MAP_HEIGHT, TILE_SIZE } from 'game/components';
import { Game } from 'game/types';

const getMapConfig = (level: Game.Levels) => {
	const mapConfig: Record<Game.Levels, Game.MapConfig> = {
		'1-1': {
			characterBottom: TILE_SIZE * 2,
			characterLeft: 0,
			width: 3376,
		},
		'1-1-secret': {
			characterBottom: MAP_HEIGHT - TILE_SIZE * 3,
			characterLeft: TILE_SIZE * 1.5,
			width: 272,
		},
	};

	return mapConfig[level];
};

export default getMapConfig;
