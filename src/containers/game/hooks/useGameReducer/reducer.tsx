import { Reducer } from 'use-immer';
import { Game } from 'game/types';
import {
	CharacterAction,
	CharacterPosition,
	CharacterState,
	Direction,
	ExternalAction,
	InternalAction,
	KeyboardAction,
} from 'game/enums';
import {
	MOVE_DISTANCE,
	CHARACTER_SIZE,
} from 'game/components/GameCharacter/constants';
import { getCharacterStateAndDirectionFromActionAndPosition } from 'game/utils';

const gameReducer: Reducer<Game.State, Game.ReducerActions> = (
	draft,
	action
) => {
	const { variable, constraint, character, view } = draft;
	const {
		left: currentLeft,
		actions: currentActions,
		position: currentPosition,
	} = character;
	const { jumpLimit } = constraint;
	const { isFalling, shouldResetJump, isJumping, jumpedAmount } = variable;
	const { width: mapWidth } = view;

	const maxLeft = mapWidth - CHARACTER_SIZE;

	const getActionIndex = (characterAction: CharacterAction) => {
		return currentActions.findIndex(currentAction => {
			return currentAction === characterAction;
		});
	};

	const addAction = (characterAction: CharacterAction) => {
		character.actions.push(characterAction);
	};

	const removeAction = (actionIndex: number) => {
		character.actions.splice(actionIndex, 1);
	};

	const removeActionIfItExists = (characterAction: CharacterAction) => {
		const actionIndex = getActionIndex(characterAction);
		if (actionIndex >= 0) removeAction(actionIndex);
	};

	switch (action.type) {
		case KeyboardAction.KeyDown: {
			const { newAction } = action;

			const newActionIndex = getActionIndex(newAction);
			let shouldNotExecuteAction = false;

			// Original game stops when leftmost part of the map is hit.
			const isRunLeftAction = newAction === CharacterAction.RunLeft;
			const isRunRightAction = newAction === CharacterAction.RunRight;
			if (currentLeft <= 0) {
				// If we can no longer go left, remove it from actions.
				removeActionIfItExists(CharacterAction.RunLeft);

				// If the current action is the run left action, stop execution.
				if (isRunLeftAction) {
					shouldNotExecuteAction = true;

					// Direction should change even if we don't take the action.
					character.direction = Direction.Left;
				}

				// If the character is not in the air, change state to standing.
				if (currentPosition !== CharacterPosition.InAir) {
					character.state = CharacterState.Standing;
				}

				// This should never happen.
				if (currentLeft < 0) character.left = 0;
			} else if (currentLeft >= maxLeft) {
				// TODO: We might want to check the flag as the maxLeft.
				// If we can no longer go right, remove it from actions.
				removeActionIfItExists(CharacterAction.RunRight);

				// If the current action is the run right action, stop execution.
				if (isRunRightAction) {
					shouldNotExecuteAction = true;

					// Direction should change even if we don't take the action.
					character.direction = Direction.Right;
				}

				// If the character is not in the air, change state to standing.
				if (currentPosition !== CharacterPosition.InAir) {
					character.state = CharacterState.Standing;
				}

				// This should never happen.
				if (currentLeft >= maxLeft) character.left = maxLeft;
			}

			// If the user is pressing the Jump key while falling, ignore the
			// jump action or remove it from the actions if it exists.
			const isJumpingAction = newAction === CharacterAction.Jump;
			if (isFalling || shouldResetJump) {
				// If we can no longer jump, remove it from actions.
				removeActionIfItExists(CharacterAction.Jump);

				// If the current action is the jump action, stop execution.
				if (isJumpingAction) shouldNotExecuteAction = true;
			}

			if (shouldNotExecuteAction) break;

			// If the action already exists, stop here.
			if (newActionIndex >= 0) break;

			addAction(newAction);

			const { state: newState, direction: newDirection } =
				getCharacterStateAndDirectionFromActionAndPosition(
					character.actions,
					currentPosition
				);

			character.state = newState;
			if (newDirection) character.direction = newDirection;

			break;
		}
		case KeyboardAction.KeyUp: {
			const { removedAction } = action;
			// When the jump key is released, we can allow jumping under the
			// condition that the fall action is complete. After the jump key
			// is released, the user can start holding the jump key prior to
			// falling and it will trigger jump.
			if (removedAction === CharacterAction.Jump) {
				variable.shouldResetJump = false;
			}

			const removedActionIndex = getActionIndex(removedAction);
			// Don't continue if we didn't have such action.
			if (removedActionIndex < 0) break;

			removeAction(removedActionIndex);

			let newState = CharacterState.Standing;
			if (!character.actions.length) {
				if (isFalling || isJumping) {
					newState = CharacterState.Jumping;
				}
			} else {
				newState = getCharacterStateAndDirectionFromActionAndPosition(
					character.actions,
					currentPosition
				).state;
			}

			character.state = newState;

			break;
		}
		case ExternalAction.SetKeyboardConfig:
			character.keyboardConfig = action.keyboardConfig;

			break;
		// STRETCH_GOAL: Annoying-mario
		// case ExternalAction.SetPosition:
		// 	character.position = action.position;
		// 	break;
		// case ExternalAction.SetActions:
		// 	character.actions = action.actions;
		// 	break;
		// case ExternalAction.SetState:
		// 	character.state = action.state;
		// 	break;
		// case ExternalAction.SetDirection:
		// 	character.direction = action.direction;
		// 	break;
		case CharacterAction.RunRight: {
			// TODO: We might want to check the flag as the maxLeft.
			// Handles the case for when the character is jumping and running
			// right and the user releases the jump key. The keydown action
			// won't be called so we need to watch out for this.
			if (currentLeft >= maxLeft) {
				removeActionIfItExists(CharacterAction.RunLeft);
				break;
			}
			character.left += MOVE_DISTANCE;

			break;
		}
		case CharacterAction.RunLeft:
			// Handles the case for when the character is jumping and running
			// left and the user releases the jump key. The keydown action won't
			// be called so we need to watch out for this.
			if (currentLeft <= 0) {
				removeActionIfItExists(CharacterAction.RunLeft);
				break;
			}
			character.left -= MOVE_DISTANCE;

			break;
		case CharacterAction.Jump:
			// Don't allow jumping while falling.
			if (isFalling) {
				variable.isJumping = false;
				break;
			}

			// TODO: Don't allow jumping when there is a monster.
			// if hitting monster, trigger death.

			// TODO: Don't allow jumping if there is a tile.
			// if hitting tile, trigger falling.

			// Don't allow jumping if the jump limit is hit.
			if (jumpedAmount >= jumpLimit) {
				// Ensure that they can't just hold the jump key.
				variable.shouldResetJump = true;
				// Trigger falling.
				variable.isFalling = true;

				break;
			}
			variable.isJumping = true;
			character.state = CharacterState.Jumping;
			character.position = CharacterPosition.InAir;
			variable.jumpedAmount += MOVE_DISTANCE;
			character.bottom += MOVE_DISTANCE;

			// STRETCH_GOAL: Cheat mode.

			break;
		case CharacterAction.Crouch:
			// STRETCH_GOAL: Cheat mode.

			break;
		case InternalAction.Fall:
			// TODO: Don't allow falling when there is a monster.
			// if hitting monster, trigger jump.

			// TODO: Don't allow falling if there is a tile.
			// if hitting tile, stop falling.

			if (jumpedAmount <= 0) {
				variable.isFalling = false;
				character.position = CharacterPosition.OnTile;

				const newState =
					getCharacterStateAndDirectionFromActionAndPosition(
						currentActions,
						character.position
					).state;
				character.state = newState;
				break;
			}

			removeActionIfItExists(CharacterAction.Jump);

			// Handle external actions.
			if (!isFalling) variable.isFalling = true;
			if (isJumping) variable.isJumping = false;

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
