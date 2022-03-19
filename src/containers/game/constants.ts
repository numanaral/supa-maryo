import * as KeyCode from 'keycode-js';
// BUG: This causes some weird issue..
// import { MAP_HEIGHT } from './components';
import { MAP_HEIGHT } from 'game/components/GameMap/constants';
import {
	CharacterAction,
	CharacterPosition,
	CharacterState,
	Direction,
} from './enums';
import { Game, Keyboard } from './types';
import { MAX_JUMP_DISTANCE } from './components/GameCharacter';

const DEFAULT_PLAYER_OPTIONS: Required<Game.PlayerOptions> = {
	level: '1-1',
	character: 'mario',
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

const DEFAULT_GAME_OPTIONS: Omit<Game.State, 'utils'> = {
	view: {
		scale: 1,
	},
	level: {
		level: '1-1',
	},
	character: {
		character: 'mario',
		bottom: MAP_HEIGHT,
		left: 0,
		actions: [],
		state: CharacterState.Standing,
		position: CharacterPosition.OnTile,
		direction: Direction.Right,
		keyboardConfig: DEFAULT_KEYBOARD_CONFIG,
	},
	constraint: {
		jumpLimit: MAX_JUMP_DISTANCE,
		minFallPosition: 0,
	},
	variable: {
		jumpedAmount: 0,
		isJumping: false,
		isFalling: false,
	},
};

export {
	DEFAULT_PLAYER_OPTIONS,
	DEFAULT_GAME_OPTIONS,
	DEFAULT_KEYBOARD_CONFIG,
};
