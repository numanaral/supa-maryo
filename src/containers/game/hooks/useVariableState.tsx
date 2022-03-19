import useGameState from './useGameState';

const useVariableState = () => {
	const { variable } = useGameState();
	return variable;
};

export default useVariableState;
