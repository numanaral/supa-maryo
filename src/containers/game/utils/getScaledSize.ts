import { Game } from 'game/types';

const getScaledSize = (size: number, scale: Game.Scale) => {
	return size * scale;
};

export default getScaledSize;
