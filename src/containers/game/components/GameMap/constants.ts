import { Game, Unit } from 'game/types';

const MAP_HEIGHT: Unit.Pixel = 240;

/* eslint-disable global-require */
const MAPS: Record<Game.Levels, string> = {
	'1-1': require('game/assets/maps/1-1.png'),
	'1-1-secret': require('game/assets/maps/1-1-secret.png'),
};
/* eslint-enable global-require */

export { MAP_HEIGHT, MAPS };
