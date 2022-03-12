import { useGameState } from 'game/hooks';
import { Game } from 'game/types';
import GameContext from './GameContext';

interface Props {
	playerOptions?: Game.PlayerOptions;
}

const GameProvider: React.FC<Props> = ({ children, playerOptions }) => {
	const state = useGameState(playerOptions);
	return (
		<GameContext.Provider value={state}>{children}</GameContext.Provider>
	);
};

export type { Props as GameProviderProps };
export default GameProvider;
