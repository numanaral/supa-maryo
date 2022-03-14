import {
	useCharacterState,
	useGameActions,
	useHandleCharacterActions,
} from 'game/hooks';
import { useInterval } from 'hooks';
import { getDemoClasses } from 'game/utils';
import { Scaled } from 'game/components';
import { CHARACTERS, MOVE_INTERVAL } from './constants';
import './styles.scss';

const demoClasses = getDemoClasses();

const GameCharacter = () => {
	const { character, top, left } = useCharacterState();
	const { onCharacterAction } = useGameActions();

	const characterBg = CHARACTERS[character];

	const {
		actions,
		state: characterState,
		direction: characterDirection,
	} = useHandleCharacterActions();

	useInterval(
		() => {
			if (!actions) return;
			actions.forEach(onCharacterAction);
		},
		MOVE_INTERVAL,
		!actions
	);

	return (
		<Scaled
			className={`character-wrapper pixel-art${demoClasses}`}
			style={{
				top,
				left,
			}}
		>
			<div
				className="character"
				data-direction={characterDirection}
				data-state={characterState}
			>
				<img
					className="sprite-sheet pixel-art"
					src={characterBg}
					alt="character sprite"
				/>
			</div>
		</Scaled>
	);
};

export default GameCharacter;
