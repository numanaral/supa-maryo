import { useState } from 'react';
import { Game } from 'game/types';
import { DEFAULT_GAME_OPTIONS } from 'game/constants';
import useGameScale from './useGameScale';

const useGameState = (playerOptions?: Game.PlayerOptions): Game.State => {
	const [options, _setOptions] = useState(() => {
		return {
			...DEFAULT_GAME_OPTIONS,
			...playerOptions,
		};
	});
	const scale = useGameScale();

	const state: Game.State = {
		...options,
		scale,
	};

	return state;
};

export default useGameState;
