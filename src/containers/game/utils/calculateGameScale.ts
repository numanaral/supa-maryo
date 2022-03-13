import { MAP_HEIGHT } from 'game/components';

const calculateGameScale = (windowObj: Window = window) => {
	return windowObj.innerHeight / MAP_HEIGHT;
};

export default calculateGameScale;
