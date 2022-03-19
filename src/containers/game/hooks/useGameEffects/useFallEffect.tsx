import { useInterval } from 'hooks';
import { MOVE_INTERVAL } from 'game/components';
import useInternalGameActions from '../useInternalGameActions';
import useVariableState from '../useVariableState';

const useFallEffect = () => {
	const { isFalling /* isJumping */ } = useVariableState();
	// TODO: Maybe create internal actions not shared in GameActions?
	// or use dispatch directly?
	const { onFall } = useInternalGameActions();
	useInterval(
		() => {
			// if jumping state but key not pressed, return
			onFall();
		},
		MOVE_INTERVAL,
		// !isFalling && !isJumping
		!isFalling
	);
};

export default useFallEffect;
