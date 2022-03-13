import { useState } from 'react';
import { Game } from 'game/types';
import { DEFAULT_PLAYER_OPTIONS, DEFAULT_GAME_OPTIONS } from 'game/constants';
import { getMapConfig } from 'game/utils';
import useGameScale from './useGameScale';

const useGameState = (playerOptions?: Game.PlayerOptions): Game.State => {
	const scale = useGameScale();
	const _playerOptions = {
		...DEFAULT_PLAYER_OPTIONS,
		...playerOptions,
	};

	const mapConfig = getMapConfig(_playerOptions.level, scale);
	// TODO: Maybe separate these into different hooks?
	const [options, _setOptions] = useState({
		...DEFAULT_GAME_OPTIONS,
		view: { scale },
		level: {
			...DEFAULT_GAME_OPTIONS.level,
			level: _playerOptions.level,
		},
		character: {
			...DEFAULT_GAME_OPTIONS.character,
			character: _playerOptions.character,
			top: mapConfig.characterTop,
			left: mapConfig.characterLeft,
		},
	});

	const state: Game.State = {
		...options,
		utils: {
			onCharacterAction: () => {
				/** TODO */
			},
		},
	};

	return state;
};

export default useGameState;
