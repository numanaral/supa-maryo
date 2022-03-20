import {
	useCharacterState,
	useGameActions,
	useHandleCharacterActions,
} from 'game/hooks';
import { useInterval } from 'hooks';
import { getDemoClasses } from 'game/utils';
import { CHARACTERS, MOVE_INTERVAL } from './constants';
import './styles.scss';

const demoClasses = getDemoClasses();

const GameCharacter = () => {
	const {
		character,
		bottom,
		left,
		actions,
		state: characterState,
		direction: characterDirection,
	} = useCharacterState();
	const { onCharacterAction } = useGameActions();

	const characterBg = CHARACTERS[character];

	useHandleCharacterActions();

	useInterval(
		() => {
			if (!actions) return;
			actions.forEach(onCharacterAction);
		},
		MOVE_INTERVAL,
		!actions.length
	);

	return (
		<div
			className={`character-wrapper pixel-art${demoClasses}`}
			// NOTE: Using bottom and left to move the character will leave
			// repaint marks on the screen. Although performance is not a big
			// issue, using transform will be beneficial in both paint issues
			// and performance, so we are going with transform.
			style={{
				transform: `translate(${left}px, -${bottom}px)`,
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
		</div>
	);
};

export default GameCharacter;
