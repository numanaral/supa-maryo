import { Game } from 'game/types';

const MAP_HEIGHT = 240;

/* eslint-disable global-require */
const MAPS: Record<Game.Levels, string> = {
	'1-1': require('game/assets/maps/1-1.png'),
};
/* eslint-enable global-require */

export { MAP_HEIGHT, MAPS };
