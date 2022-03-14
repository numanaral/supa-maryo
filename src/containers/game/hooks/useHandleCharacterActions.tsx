import { useEffect, useState } from 'react';
import {
	CharacterAction,
	CharacterPosition,
	CharacterState,
	Direction,
} from 'game/enums';
import { Keyboard } from 'game/types';
import {
	getCharacterActionFromKeyCode,
	getCharacterStateAndDirectionFromActionAndPosition,
} from 'game/utils';
import { DEFAULT_KEYBOARD_CONFIG } from 'game/constants';

const useHandleCharacterActions = () => {
	// TODO: Move to context:
	const keyboardConfig = DEFAULT_KEYBOARD_CONFIG;
	const position = CharacterPosition.OnTile;
	const [actions, setActions] = useState<Array<CharacterAction> | null>(null);
	const [state, setState] = useState<CharacterState>(CharacterState.Standing);
	const [direction, setDirection] = useState<Direction>(Direction.Right);

	useEffect(() => {
		const getCharacterAction = (e: KeyboardEvent) => {
			return getCharacterActionFromKeyCode(
				e.code as Keyboard.EventCode,
				keyboardConfig
			);
		};

		const handleKeyDown = (e: KeyboardEvent) => {
			const newAction = getCharacterAction(e);

			if (!newAction) return;

			let newActions = [newAction];
			setActions(v => {
				if (!v) return newActions;
				if (!v.length) return newActions;

				// @ts-ignore
				newActions = [...new Set(newActions.concat(v))];

				return newActions;
			});

			const { state: newState, direction: newDirection } =
				getCharacterStateAndDirectionFromActionAndPosition(
					newActions,
					position
				);

			setState(newState);
			if (newDirection && direction !== newDirection) {
				setDirection(newDirection);
			}
		};

		const handleKeyUp = (e: KeyboardEvent) => {
			const removedAction = getCharacterAction(e);

			if (!removedAction) return;

			const newActions: Array<CharacterAction> = [];
			setActions(v => {
				if (!v) return v;
				if (v.length === 1) return [];
				return v.filter(currentAction => {
					if (currentAction !== removedAction) {
						newActions.push(currentAction);
						return true;
					}
					return false;
				});
			});
			if (!newActions.length) {
				setState(CharacterState.Standing);
				return;
			}
			setState(
				getCharacterStateAndDirectionFromActionAndPosition(
					newActions,
					position
				).state
			);
		};

		document.addEventListener('keydown', handleKeyDown);
		document.addEventListener('keyup', handleKeyUp);

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
			document.removeEventListener('keyup', handleKeyUp);
		};
		// We can assume that keyboard config won't change during gameplay.
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [direction]);

	return { actions, state, direction } as const;
};

export default useHandleCharacterActions;
