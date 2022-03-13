import { useImmerReducer } from 'use-immer';
import { Game } from 'game/types';
import { calculateGameScale } from 'game/utils';
import { CharacterAction } from 'game/enums';
import { useOnResize, WindowEvent } from 'hooks';
import reducer from './reducer';
import getInitialState from './initialState';

const useGameReducer = (playerOptions?: Game.PlayerOptions): Game.Context => {
	const [gameState, gameDispatch] = useImmerReducer(
		reducer,
		getInitialState(playerOptions)
	);

	const onResize = (e: WindowEvent) => {
		const windowObj = e?.target;
		if (!windowObj) return;
		gameDispatch({ type: 'Resize', scale: calculateGameScale(windowObj) });
	};

	useOnResize(onResize);

	const gameActions: Game.Actions = {
		onCharacterAction: (action: CharacterAction) => {
			gameDispatch({ type: action });
		},
	};

	const context: Game.Context = {
		state: gameState,
		actions: gameActions,
	};

	return context;
};

export default useGameReducer;
