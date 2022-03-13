import useGameState from './useGameState';

const useCharacterState = () => {
	const { character } = useGameState();
	return character;
};

export default useCharacterState;
