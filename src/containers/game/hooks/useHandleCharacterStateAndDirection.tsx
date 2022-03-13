import { useEffect, useState } from 'react';
import {
	CharacterAction,
	CharacterPosition,
	CharacterState,
	Direction,
} from 'game/enums';
import { Keyboard } from 'game/types';
import { getCharacterPropsFromKeyCode } from 'game/utils';
import { DEFAULT_KEYBOARD_CONFIG } from 'game/constants';

const useHandleCharacterStateAndDirection = () => {
	// TODO: Move to context:
	const keyboardConfig = DEFAULT_KEYBOARD_CONFIG;
	const position = CharacterPosition.OnTile;

	const [action, setAction] = useState<CharacterAction | null>(null);
	const [state, setState] = useState<CharacterState>(CharacterState.Standing);
	const [direction, setDirection] = useState<Direction>(Direction.Right);

	useEffect(() => {
		// ignore the npc action
		const getStateAndDirection = (e: KeyboardEvent) => {
			return keyboardConfig
				? getCharacterPropsFromKeyCode(
						position,
						e.code as Keyboard.EventCode,
						keyboardConfig
				  )
				: {};
		};

		const handleKeyDown = (e: KeyboardEvent) => {
			const {
				action: newAction,
				state: newState = CharacterState.Standing,
				direction: newDirection,
			} = getStateAndDirection(e);

			setAction(newAction || null);
			setState(newState);
			if (newDirection && direction !== newDirection) {
				setDirection(newDirection);
			}
		};

		const handleKeyUp = () => {
			setState(CharacterState.Standing);
			setAction(null);
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

	return { action, state, direction } as const;
};

export default useHandleCharacterStateAndDirection;
