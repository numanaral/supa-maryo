import { WindowEvent } from 'hooks';
import * as KeyCode from 'keycode-js';
import {
	CharacterAction,
	CharacterState as CharacterStateEnum,
	CharacterPosition,
	Direction,
	InternalAction,
	ExternalAction,
	KeyboardAction,
} from './enums';

namespace Game {
	export type Levels = '1-1' | '1-1-secret';
	export type Characters = 'mario' | 'luigi';
	export type Scale = number;
	export type Position = Unit.Pixel;
	export type JumpLimit = Unit.Pixel;

	// TODO:
	export interface MapConfig {
		characterBottom: Position;
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
		bottom: Position;
		left: Position;
		actions: Array<CharacterAction>;
		state: CharacterStateEnum;
		position: CharacterPosition;
		direction: Direction;
		keyboardConfig: Keyboard.KeyboardConfig;
	}

	export interface ConstraintState {
		jumpLimit: JumpLimit;
		// maxJumpPosition: Position;
		minFallPosition: Position;
	}

	export interface VariableState {
		/**
		 * Used to calculate the max amount to be jumped.
		 */
		jumpedAmount: Unit.Pixel;
		/**
		 * Prevent user from holding the jump key and continuously jumping. Each
		 * new jump requires a key up followed by a key down.
		 */
		shouldResetJump: boolean;
		isJumping: boolean;
		isFalling: boolean;
	}

	export interface State {
		view: ViewState;
		level: LevelState;
		character: CharacterState;
		constraint: ConstraintState;
		variable: VariableState;
	}

	export interface CharacterActions {
		onCharacterAction: (action: CharacterAction) => void;
		onKeyDown: (newAction: CharacterAction) => void;
		onKeyUp: (removedAction: CharacterAction) => void;
		setKeyboardConfig: (keyboardConfig: Keyboard.KeyboardConfig) => void;
		// STRETCH_GOAL: Annoying-mario
		// setPosition: (position: CharacterPosition) => void;
		// setActions: (actions: CharacterActions) => void;
		// setState: (state: CharacterState) => void;
		// setDirection: (direction: Direction) => void;
	}

	// TODO: Rename to ExternalActions.
	export interface Actions extends CharacterActions {}
	export interface InternalActions {
		onResize: (e: WindowEvent) => void;
		onFall: () => void;
	}

	export type InternalReducerActions =
		| Utils.ReducerAction<InternalAction.Fall>
		| Utils.ReducerAction<InternalAction.Resize, { scale: Scale }>;

	export type ExternalReducerActions =
		| Utils.ReducerAction<CharacterAction>
		| Utils.ReducerAction<
				KeyboardAction.KeyDown,
				{ newAction: CharacterAction }
		  >
		| Utils.ReducerAction<
				KeyboardAction.KeyUp,
				{ removedAction: CharacterAction }
		  >
		| Utils.ReducerAction<
				ExternalAction.SetKeyboardConfig,
				{ keyboardConfig: Keyboard.KeyboardConfig }
		  >;
	// STRETCH_GOAL: Annoying-mario
	// | Utils.ReducerAction<
	// 		ExternalAction.SetPosition,
	// 		{ position: CharacterPosition }
	//   >
	// | Utils.ReducerAction<
	// 		ExternalAction.SetActions,
	// 		{ actions: CharacterActions }
	//   >
	// | Utils.ReducerAction<
	// 		ExternalAction.SetState,
	// 		{ state: CharacterState }
	//   >
	// | Utils.ReducerAction<
	// 		ExternalAction.SetDirection,
	// 		{ direction: Direction }
	//   >;

	export interface Context {
		state: State;
		internalActions: InternalActions;
		// TODO: Rename to ExternalActions.
		actions: Actions;
	}

	// TODO: Possibly move to a separate namespace.
	export type ReducerActions =
		| InternalReducerActions
		| ExternalReducerActions;

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

	export type ReducerAction<
		Action extends string,
		Rest extends object = {}
	> = {
		type: Action;
	} & Rest;
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
