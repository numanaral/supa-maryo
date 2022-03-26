import {
	useGameState,
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
		character: {
			character,
			bottom,
			left,
			actions,
			state: characterState,
			direction: characterDirection,
		},
		view: { scale, width },
	} = useGameState();
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

	let translateX = left;
	const translateY = bottom;

	const windowSize = window.innerWidth / scale;
	const halfWindowSize = windowSize / 2;
	const maxWidth = width - halfWindowSize;
	// Calculating from the center of the screen.
	const leftInScreen = halfWindowSize + Math.max(0, left - maxWidth);

	translateX = Math.min(left, leftInScreen);

	return (
		<div
			className={`character-wrapper pixel-art${demoClasses}`}
			// NOTE: Using bottom and left to move the character will leave
			// repaint marks on the screen. Although performance is not a big
			// issue, using transform will be beneficial in both paint issues
			// and performance, so we are going with transform.
			style={{
				transform: `translate(${translateX}px, -${translateY}px)`,
				// transform: `translate(${left}px, -${bottom}px)`,
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
