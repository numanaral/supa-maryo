import { Map } from './components';
import { GameProvider } from './providers';
import { Game } from './types';
import 'game/styles.scss';

interface Props {
	playerOptions?: Game.PlayerOptions;
}

const GameWindow = ({ playerOptions }: Props) => {
	return (
		<GameProvider playerOptions={playerOptions}>
			<Map />
		</GameProvider>
	);
};

export type { Props as GameWindowProps };
export default GameWindow;
