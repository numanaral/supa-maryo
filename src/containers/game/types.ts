import * as KeyCode from 'keycode-js';
import { CharacterAction } from './enums';

namespace Game {
	export type Levels = '1-1';
	export type Characters = 'mario' | 'luigi';
	export type Scale = number;
	export type Position = Unit.Pixel;

	// TODO:
	export interface MapConfig {
		characterTop: Position;
		characterLeft: Position;
	}

	export interface ViewState {
		scale: Scale;
	}

	export interface LevelState {
		level: Levels;
	}

	export interface CharacterState {
		character: Characters;
		top: Position;
		left: Position;
	}

	export interface State {
		view: ViewState;
		level: LevelState;
		character: CharacterState;
	}

	export interface CharacterActions {
		onCharacterAction: (action: CharacterAction) => void;
	}

	export interface Actions extends CharacterActions {}

	export interface Context {
		state: State;
		actions: Actions;
	}

	// TODO: Possibly move to a separate namespace.
	export type ReducerActions =
		| {
				type: CharacterAction;
		  }
		| {
				type: 'Resize';
				scale: number;
		  };

	export interface PlayerOptions {
		level?: Levels;
		character?: Characters;
	}
}

namespace Utils {
	/**
	 * Get the keys of the object as a type
	 *
	 * @example
	 * ```ts
	 * const AXIS = {
	 * 	X: 'xVal',
	 * 	Y: 'yVal',
	 * };
	 *
	 * // 'X' | 'Y'
	 * KeysOf<typeof AXIS>
	 * ```
	 */
	export type KeysOf<T> = keyof T;

	/**
	 * Get the values of the object with const assertion as a type.
	 * - `{} as const`
	 * - `<const>{}`
	 * - `[] as const`
	 * - `<const>[]`
	 *
	 * @example
	 * ```ts
	 * // note the "as const"
	 * const AXIS = {
	 * 	X: 'xVal',
	 * 	Y: 'yVal',
	 * } as const;
	 *
	 * // 'xVal' | 'yVal'
	 * ValuesOf<typeof AXIS>
	 *
	 * const NUMBERS = [1, 2] as const;
	 * // 1 | 2
	 * ValuesOf<typeof NUMBERS>
	 * ```
	 */
	export type ValuesOf<T> = Exclude<T[KeysOf<T>], Function>;
}

namespace Unit {
	export type Pixel = number;
	export type Second = number;
	export type Ms = number;
}

namespace Keyboard {
	export type EventCode = Utils.ValuesOf<typeof KeyCode>;
	export type KeyboardConfig = Record<CharacterAction, Array<EventCode>>;
}

export type { Game, Utils, Unit, Keyboard };
