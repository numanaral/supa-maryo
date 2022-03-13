import * as KeyCode from 'keycode-js';
import { CharacterAction } from './enums';

namespace Game {
	export type Levels = '1-1';
	export type Characters = 'mario' | 'luigi';
	export type Scale = number;
	export type Position = number;

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

	export interface GameUtils {
		onCharacterAction: (action: CharacterAction) => void;
	}

	export interface State {
		view: ViewState;
		level: LevelState;
		character: CharacterState;
		utils: GameUtils;
	}

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

namespace Keyboard {
	export type EventCode = Utils.ValuesOf<typeof KeyCode>;
	export type KeyboardConfig = Record<CharacterAction, Array<EventCode>>;
}

export type { Game, Utils, Keyboard };
