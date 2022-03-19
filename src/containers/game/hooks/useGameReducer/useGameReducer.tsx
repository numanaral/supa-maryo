import { useMemo } from 'react';
import { useImmerReducer } from 'use-immer';
import { Game } from 'game/types';
import { calculateGameScale } from 'game/utils';
import {
	CharacterAction,
	ExternalAction,
	InternalAction,
	KeyboardAction,
} from 'game/enums';
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
			onKeyDown: newAction => {
				gameDispatch({ type: KeyboardAction.KeyDown, newAction });
			},
			onKeyUp: removedAction => {
				gameDispatch({ type: KeyboardAction.KeyUp, removedAction });
			},
			setKeyboardConfig: keyboardConfig => {
				gameDispatch({
					type: ExternalAction.SetKeyboardConfig,
					keyboardConfig,
				});
			},
			// STRETCH_GOAL: Annoying-mario
			// setPosition: position => {
			// 	gameDispatch({ type: ExternalAction.SetPosition, position });
			// },
			// setActions: actions => {
			// 	gameDispatch({ type: ExternalAction.SetActions, actions });
			// },
			// setState: state => {
			// 	gameDispatch({ type: ExternalAction.SetState, state });
			// },
			// setDirection: direction => {
			// 	gameDispatch({ type: ExternalAction.SetDirection, direction });
			// },
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
