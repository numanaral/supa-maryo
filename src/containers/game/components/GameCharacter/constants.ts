import { Game } from 'game/types';

const CHARACTER_SIZE = 16;
const SPRITE_START_SMALL = 30;

/* eslint-disable global-require */
const CHARACTERS: Record<Game.Characters, string> = {
	mario: require('game/assets/characters/mario.png'),
	luigi: require('game/assets/characters/luigi.png'),
};
/* eslint-enable global-require */

export { CHARACTER_SIZE, SPRITE_START_SMALL, CHARACTERS };
