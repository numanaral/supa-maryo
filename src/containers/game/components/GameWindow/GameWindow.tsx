import { GameProvider } from 'game/providers';
import { Game } from 'game/types';
import GameMap from '../GameMap';
import GameContainer from '../GameContainer';
import GameCharacter from '../GameCharacter';
import 'game/styles.scss';

interface Props {
	playerOptions?: Game.PlayerOptions;
}

const GameWindow = ({ playerOptions }: Props) => {
	return (
		<GameProvider playerOptions={playerOptions}>
			<GameContainer>
				<GameMap />
			</GameContainer>
		</GameProvider>
	);
};

export type { Props as GameWindowProps };
export default GameWindow;
