import { MAP_HEIGHT, TILE_SIZE } from './components';
import {
	CharacterAction,
	CharacterPosition,
	CharacterState,
	Direction,
} from './enums';
import { Game, Keyboard } from './types';

const ACTION_KEYS = Object.keys(CharacterAction) as Array<CharacterAction>;
const ACTION_COUNT = ACTION_KEYS.length;

const getCharacterPropsFromKeyCode = (
	characterPosition: CharacterPosition,
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

	if (!action) return {};

	let direction: Direction | null = null;
	let isRunning = false;

	if (action === CharacterAction.RunRight) {
		direction = Direction.Right;
		isRunning = true;
	} else if (action === CharacterAction.RunLeft) {
		direction = Direction.Left;
		isRunning = true;
	}

	let state: CharacterState = CharacterState.Standing;
	if (isRunning) {
		switch (characterPosition) {
			case CharacterPosition.OnTile:
				state = CharacterState.Running;
				break;
			case CharacterPosition.InAir:
				state = CharacterState.Jumping;
				break;
			case CharacterPosition.InWater:
				state = CharacterState.Swimming;
				break;
			default:
				// Do nothing.
				break;
		}
	} else {
		switch (action) {
			case CharacterAction.Jump:
				state = CharacterState.Jumping;
				break;
			case CharacterAction.Crouch:
				state = CharacterState.Crouching;
				break;
			case CharacterAction.Fire:
				state = CharacterState.Firing;
				break;
			default:
				// Do nothing.
				break;
		}
	}

	return { action, state, direction } as const;
};

const getMapConfig = (level: Game.Levels, scale: Game.Scale) => {
	const mapConfig: Record<Game.Levels, Game.MapConfig> = {
		'1-1': {
			// 2 tiles + actual block.
			characterTop: (MAP_HEIGHT - TILE_SIZE * (2 + 1)) * scale,
			characterLeft: 0,
		},
	};

	return mapConfig[level];
};

const calculateGameScale = (windowObj: Window = window) => {
	return windowObj.innerHeight / MAP_HEIGHT;
};

export { getCharacterPropsFromKeyCode, getMapConfig, calculateGameScale };
