import { useMemo } from 'react';
import { useImmerReducer } from 'use-immer';
import { Game } from 'game/types';
import { calculateGameScale } from 'game/utils';
import { CharacterAction, InternalAction } from 'game/enums';
import { WindowEvent } from 'hooks';
import reducer from './reducer';
import getInitialState from './initialState';

const useGameReducer = (playerOptions?: Game.PlayerOptions): Game.Context => {
	const [gameState, gameDispatch] = useImmerReducer(
		reducer,
		getInitialState(playerOptions)
	);

	const internalActions = useMemo<Game.InternalActions>(() => {
		return {
			onResize: (e: WindowEvent) => {
				const windowObj = e?.target;
				if (!windowObj) return;
				gameDispatch({
					type: InternalAction.Resize,
					scale: calculateGameScale(windowObj),
				});
			},
			onFall: () => {
				gameDispatch({
					type: InternalAction.Fall,
				});
			},
		};
	}, [gameDispatch]);

	const gameActions = useMemo<Game.Actions>(() => {
		return {
			onCharacterAction: (action: CharacterAction) => {
				gameDispatch({ type: action });
			},
		};
	}, [gameDispatch]);

	const context: Game.Context = {
		state: gameState,
		internalActions,
		// TODO: Rename to ExternalActions
		actions: gameActions,
	};

	return context;
};

export default useGameReducer;
