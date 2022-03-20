import { Reducer } from 'use-immer';
import { Game } from 'game/types';
import {
	CharacterAction,
	CharacterPosition,
	CharacterState,
	ExternalAction,
	InternalAction,
	KeyboardAction,
} from 'game/enums';
import { MOVE_DISTANCE } from 'game/components/GameCharacter/constants';
import {
	getCharacterStateAndDirectionFromActionAndPosition,
	getScaledSize,
} from 'game/utils';

const gameReducer: Reducer<Game.State, Game.ReducerActions> = (
	draft,
	action
) => {
	const { variable, constraint, character, view } = draft;
	const {
		actions: currentActions,
		position: currentPosition,
		direction: currentDirection,
	} = character;
	const { jumpLimit } = constraint;
	const { isFalling, isJumping, jumpedAmount } = variable;
	const { scale } = view;

	const getScaledValue = (val: number) => {
		return getScaledSize(val, scale);
	};

	const scaledJumpLimit = getScaledValue(jumpLimit);

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

	switch (action.type) {
		case KeyboardAction.KeyDown: {
			const newActions: Array<CharacterAction> = [];
			const { newAction } = action;

			// If the user is pressing the Jump key while falling, ignore the
			// jump action or remove it from the actions if it exists.
			const isJumpingAction = newAction === CharacterAction.Jump;
			const newActionIndex = getActionIndex(newAction);
			if (isJumpingAction && isFalling) {
				if (newActionIndex >= 0) removeAction(newActionIndex);
				break;
			}

			// Only add a new action if it doesn't already exist.
			if (newActionIndex < 0) {
				newActions.push(newAction);
				addAction(newAction);
			}

			const { state: newState, direction: newDirection } =
				getCharacterStateAndDirectionFromActionAndPosition(
					character.actions,
					currentPosition
				);

			character.state = newState;
			if (newDirection && currentDirection !== newDirection) {
				character.direction = newDirection;
			}
			break;
		}
		case KeyboardAction.KeyUp: {
			const { removedAction } = action;
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
		case CharacterAction.RunRight:
			character.left += MOVE_DISTANCE;
			break;
		case CharacterAction.RunLeft:
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
			if (jumpedAmount >= scaledJumpLimit) {
				// Trigger falling.
				variable.isFalling = true;
				break;
			}
			if (!isJumping) variable.isJumping = true;
			if (currentPosition !== CharacterPosition.InAir) {
				character.position = CharacterPosition.InAir;
			}
			variable.jumpedAmount += MOVE_DISTANCE;
			character.bottom += MOVE_DISTANCE;

			// STRETCH_GOAL: Cheat mode.
			break;
		case CharacterAction.Crouch:
			// STRETCH_GOAL: Cheat mode.
			character.bottom -= MOVE_DISTANCE;
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
