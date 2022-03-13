import useGameContext from './useGameContext';

const useGameState = () => {
	const { state } = useGameContext();
	return state;
};

export default useGameState;
