import { Game } from 'game/types';
import { DEFAULT_PLAYER_OPTIONS, DEFAULT_GAME_OPTIONS } from 'game/constants';
import { calculateGameScale, getMapConfig } from 'game/utils';

const getInitialState = (playerOptions?: Game.PlayerOptions) => {
	const scale = calculateGameScale();
	const _playerOptions = {
		...DEFAULT_PLAYER_OPTIONS,
		...playerOptions,
	};
	const mapConfig = getMapConfig(_playerOptions.level);
	return {
		...DEFAULT_GAME_OPTIONS,
		view: { scale, width: mapConfig.width },
		level: {
			...DEFAULT_GAME_OPTIONS.level,
			level: _playerOptions.level,
		},
		character: {
			...DEFAULT_GAME_OPTIONS.character,
			character: _playerOptions.character,
			bottom: mapConfig.characterBottom,
			left: mapConfig.characterLeft,
		},
	};
};

export default getInitialState;
