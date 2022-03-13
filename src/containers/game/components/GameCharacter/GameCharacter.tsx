import { useCharacterState, useHandleCharacterActions } from 'game/hooks';
import { CHARACTERS } from './constants';
import Scaled from '../Scaled';
import './styles.scss';

// /?q&demo=true&speed=slow
const getDemoClasses = () => {
	const urlSearchParams = new URLSearchParams(window.location.href);
	const demo = urlSearchParams.get('demo') === 'true';
	const speed = urlSearchParams.get('speed') || 'fast';

	if (!demo) return '';
	return ` demo ${speed}`;
};
const demoClasses = getDemoClasses();

// const demoStyle = (style: string) => {
// 	return demo ? style : '';
// };

const GameCharacter = () => {
	const { character, top, left } = useCharacterState();

	const characterBg = CHARACTERS[character];

	const { state: characterState, direction: characterDirection } =
		useHandleCharacterActions();

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
