import useGameContext from './useGameContext';

const useInternalGameActions = () => {
	const { internalActions } = useGameContext();
	return internalActions;
};

export default useInternalGameActions;
