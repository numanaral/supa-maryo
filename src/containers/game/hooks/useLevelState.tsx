import useGameState from './useGameState';

const useLevelState = () => {
	const { level } = useGameState();
	return level;
};

export default useLevelState;
