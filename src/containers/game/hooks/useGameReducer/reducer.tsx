import { Reducer } from 'use-immer';
import { Game } from 'game/types';
import { CharacterAction } from 'game/enums';
import { MOVE_DISTANCE } from 'game/components/GameCharacter/constants';

const gameReducer: Reducer<Game.State, Game.ReducerActions> = (
	draft,
	action
) => {
	switch (action.type) {
		case CharacterAction.RunRight:
			draft.character.left += MOVE_DISTANCE;
			break;
		case CharacterAction.RunLeft:
			draft.character.left -= MOVE_DISTANCE;
			break;
		case CharacterAction.Jump:
			// TODO: Temp allow mario to fly.
			draft.character.bottom += MOVE_DISTANCE;
			break;
		case CharacterAction.Crouch:
			// TODO: Temp allow mario to fly.
			draft.character.bottom -= MOVE_DISTANCE;
			break;
		case 'Resize':
			draft.view.scale = action.scale;
			break;
		default:
			console.error(`Action ${action.type} is not implemented.`);
	}
};

export default gameReducer;
