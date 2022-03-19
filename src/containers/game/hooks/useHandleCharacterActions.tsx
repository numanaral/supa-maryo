import { useEffect } from 'react';
import { Keyboard } from 'game/types';
import { getCharacterActionFromKeyCode } from 'game/utils';
import useCharacterState from './useCharacterState';
import useGameActions from './useGameActions';

const useHandleCharacterActions = () => {
	const { keyboardConfig } = useCharacterState();
	const { onKeyDown, onKeyUp } = useGameActions();

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

			onKeyDown(newAction);
		};

		const handleKeyUp = (e: KeyboardEvent) => {
			const removedAction = getCharacterAction(e);
			if (!removedAction) return;

			onKeyUp(removedAction);
		};

		document.addEventListener('keydown', handleKeyDown);
		document.addEventListener('keyup', handleKeyUp);

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
			document.removeEventListener('keyup', handleKeyUp);
		};
		// We can assume that keyboard config won't change during gameplay.
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
};

export default useHandleCharacterActions;
