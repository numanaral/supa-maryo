import useGameState from './useGameState';

const useViewState = () => {
	const { view } = useGameState();
	return view;
};

export default useViewState;
