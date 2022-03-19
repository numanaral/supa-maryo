import { Game, Unit } from 'game/types';

const CHARACTER_SIZE: Unit.Pixel = 16;
const SPRITE_START_SMALL: Unit.Pixel = 30;

/* eslint-disable global-require */
const CHARACTERS: Record<Game.Characters, string> = {
	mario: require('game/assets/characters/mario.png'),
	luigi: require('game/assets/characters/luigi.png'),
};
/* eslint-enable global-require */

const MOVE_INTERVAL: Unit.Ms = 50;
const MOVE_DISTANCE: Unit.Pixel = 10;
// 5-1 as we use the bottom left.
const MAX_JUMP_DISTANCE: Unit.Pixel = 4 * CHARACTER_SIZE;
const LEFT_MIN: Unit.Pixel = 0;

export {
	CHARACTER_SIZE,
	SPRITE_START_SMALL,
	CHARACTERS,
	MOVE_INTERVAL,
	MOVE_DISTANCE,
	MAX_JUMP_DISTANCE,
	LEFT_MIN,
};
