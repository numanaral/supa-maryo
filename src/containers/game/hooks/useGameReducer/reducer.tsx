import { Reducer } from 'use-immer';
import { Game } from 'game/types';
import { CharacterAction } from 'game/enums';

const gameReducer: Reducer<Game.State, Game.ReducerActions> = (
	draft,
	action
) => {
	switch (action.type) {
		case CharacterAction.RunRight:
			draft.character.left += 10;
			break;
		case CharacterAction.RunLeft:
			draft.character.left -= 10;
			break;
		case CharacterAction.Jump:
			draft.character.top -= 10;
			break;
		case 'Resize':
			draft.view.scale = action.scale;
			break;
		default:
			console.error(`Action ${action.type} is not implemented.`);
	}
};

export default gameReducer;
