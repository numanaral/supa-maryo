import { useInterval } from 'hooks';
import { MOVE_INTERVAL } from 'game/components';
import { CharacterAction } from 'game/enums';
import useInternalGameActions from '../useInternalGameActions';
import useVariableState from '../useVariableState';
import useCharacterState from '../useCharacterState';

const useFallEffect = () => {
	const { actions } = useCharacterState();
	const { isFalling, isJumping } = useVariableState();
	const { onFall } = useInternalGameActions();

	useInterval(
		() => {
			// We will start the fall action when the character stops jumping.
			if (isJumping && actions.includes(CharacterAction.Jump)) return;
			// Or when the character is already falling.
			onFall();
		},
		MOVE_INTERVAL,
		!isFalling && !isJumping
	);
};

export default useFallEffect;
