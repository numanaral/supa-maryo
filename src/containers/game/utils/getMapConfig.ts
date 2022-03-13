import { MAP_HEIGHT, TILE_SIZE } from 'game/components';
import { Game } from 'game/types';

const getMapConfig = (level: Game.Levels, scale: Game.Scale) => {
	const mapConfig: Record<Game.Levels, Game.MapConfig> = {
		'1-1': {
			// 2 tiles + actual block.
			characterTop: (MAP_HEIGHT - TILE_SIZE * (2 + 1)) * scale,
			characterLeft: 0,
		},
	};

	return mapConfig[level];
};

export default getMapConfig;
