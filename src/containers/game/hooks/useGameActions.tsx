import useGameContext from './useGameContext';

const useGameActions = () => {
	const { actions } = useGameContext();
	return actions;
};

export default useGameActions;
