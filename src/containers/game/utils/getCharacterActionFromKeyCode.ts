import { CharacterAction } from 'game/enums';
import { Keyboard } from 'game/types';

const ACTION_KEYS = Object.keys(CharacterAction) as Array<CharacterAction>;
const ACTION_COUNT = ACTION_KEYS.length;

const getCharacterActionFromKeyCode = (
	keyCode: Keyboard.EventCode,
	keyboardConfig: Keyboard.KeyboardConfig
) => {
	let action: CharacterAction | null = null;
	for (let i = 0; i < ACTION_COUNT; i++) {
		const currentAction = ACTION_KEYS[i];
		const keyboardKeysForAction = keyboardConfig[currentAction];

		if (keyboardKeysForAction.includes(keyCode)) {
			action = currentAction;
			break;
		}
	}

	return action;
};

export default getCharacterActionFromKeyCode;
