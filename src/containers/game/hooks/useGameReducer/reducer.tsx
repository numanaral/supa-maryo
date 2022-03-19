import { Reducer } from 'use-immer';
import { Game } from 'game/types';
import { CharacterAction, InternalAction } from 'game/enums';
import { MOVE_DISTANCE } from 'game/components/GameCharacter/constants';
import { getScaledSize } from 'game/utils';

const gameReducer: Reducer<Game.State, Game.ReducerActions> = (
	draft,
	action
) => {
	const { variable, constraint, character, view } = draft;
	const { jumpLimit } = constraint;
	const { scale } = view;

	const getScaledValue = (val: number) => {
		return getScaledSize(val, scale);
	};

	const scaledJumpLimit = getScaledValue(jumpLimit);

	switch (action.type) {
		case CharacterAction.RunRight:
			character.left += MOVE_DISTANCE;
			break;
		case CharacterAction.RunLeft:
			character.left -= MOVE_DISTANCE;
			break;
		case CharacterAction.Jump:
			// Don't allow jumping while falling.
			if (variable.isFalling) break;

			// Don't allow jumping when there is a monster.
			// if hitting monster, trigger death.

			// Don't allow jumping if there is a tile.
			// if hitting tile, trigger falling.

			// Don't allow jumping if the jump limit is hit.
			if (variable.jumpedAmount >= scaledJumpLimit) {
				// Trigger falling.
				variable.isFalling = true;
				break;
			}
			if (!variable.isJumping) variable.isJumping = true;
			variable.jumpedAmount += MOVE_DISTANCE;
			character.bottom += MOVE_DISTANCE;

			// STRETCH_GOAL: Cheat mode.
			break;
		case CharacterAction.Crouch:
			// STRETCH_GOAL: Cheat mode.
			character.bottom -= MOVE_DISTANCE;
			break;
		case InternalAction.Fall:
			if (variable.jumpedAmount <= 0) {
				variable.isFalling = false;
				break;
			}
			variable.jumpedAmount -= MOVE_DISTANCE;
			character.bottom -= MOVE_DISTANCE;
			// STRETCH_GOAL: Cheat mode.
			break;
		case InternalAction.Resize:
			view.scale = action.scale;
			break;
		default:
			console.error(`Action ${action.type} is not implemented.`);
	}
};

export default gameReducer;
