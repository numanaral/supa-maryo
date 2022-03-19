import { GameProvider } from 'game/providers';
import { useGameEffects } from 'game/hooks';
import { Game } from 'game/types';
import GameMap from '../GameMap';
import GameContainer from '../GameContainer';
import GameCharacter from '../GameCharacter';
import 'game/styles.scss';

interface Props {
	playerOptions?: Game.PlayerOptions;
}

const GameWindow = () => {
	useGameEffects();
	return (
		<GameContainer>
			<GameMap />
			<GameCharacter />
		</GameContainer>
	);
};

const Wrapper = ({ playerOptions }: Props) => {
	return (
		<GameProvider playerOptions={playerOptions}>
			<GameWindow />
		</GameProvider>
	);
};

export type { Props as GameWindowProps };
export default Wrapper;
