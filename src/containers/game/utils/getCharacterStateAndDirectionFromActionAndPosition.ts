import {
	CharacterAction,
	CharacterPosition,
	CharacterState,
	Direction,
} from 'game/enums';

const getCharacterStateAndDirectionBasedOnActionsAndPosition = (
	actions: Array<CharacterAction>,
	characterPosition: CharacterPosition
) => {
	let direction: Direction | null = null;
	let isRunning = false;

	const includesAction = (a: CharacterAction) => {
		return actions.includes(a);
	};

	if (includesAction(CharacterAction.RunRight)) {
		direction = Direction.Right;
		isRunning = true;
	} else if (includesAction(CharacterAction.RunLeft)) {
		direction = Direction.Left;
		isRunning = true;
	}

	const isJumping = includesAction(CharacterAction.Jump);

	let state: CharacterState = CharacterState.Standing;
	// Even though we are handling multiple actions, we only display one state.
	if (isRunning) {
		switch (characterPosition) {
			case CharacterPosition.OnTile:
				state = isJumping
					? CharacterState.Jumping
					: CharacterState.Running;
				break;
			case CharacterPosition.InAir:
				state = CharacterState.Jumping;
				break;
			case CharacterPosition.InWater:
				state = CharacterState.Swimming;
				break;
			default:
				// Do nothing.
				break;
		}
	} else if (isJumping) {
		state = CharacterState.Jumping;
	} else if (includesAction(CharacterAction.Crouch)) {
		state = CharacterState.Crouching;
	} else if (includesAction(CharacterAction.Fire)) {
		state = CharacterState.Firing;
	}

	return { state, direction };
};
export default getCharacterStateAndDirectionBasedOnActionsAndPosition;
