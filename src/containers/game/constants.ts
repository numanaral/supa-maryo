import * as KeyCode from 'keycode-js';
import { CharacterAction } from './enums';
import { Game, Keyboard } from './types';

const DEFAULT_PLAYER_OPTIONS: Required<Game.PlayerOptions> = {
	level: '1-1',
	character: 'mario',
};

const DEFAULT_GAME_OPTIONS: Omit<Game.State, 'utils'> = {
	view: {
		scale: 1,
	},
	level: {
		level: '1-1',
	},
	character: {
		character: 'mario',
		top: 0,
		left: 0,
	},
};

const DEFAULT_KEYBOARD_CONFIG: Keyboard.KeyboardConfig = {
	[CharacterAction.RunRight]: [KeyCode.CODE_RIGHT, KeyCode.CODE_D],
	[CharacterAction.RunLeft]: [KeyCode.CODE_LEFT, KeyCode.CODE_A],
	[CharacterAction.Jump]: [
		KeyCode.CODE_UP,
		KeyCode.CODE_W,
		KeyCode.CODE_SPACE,
	],
	[CharacterAction.Crouch]: [KeyCode.CODE_DOWN, KeyCode.CODE_S],
	[CharacterAction.Fire]: [KeyCode.KEY_SHIFT, KeyCode.KEY_CONTROL],
};

export {
	DEFAULT_PLAYER_OPTIONS,
	DEFAULT_GAME_OPTIONS,
	DEFAULT_KEYBOARD_CONFIG,
};
