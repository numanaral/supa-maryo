enum CharacterAction {
	RunRight = 'RunRight',
	RunLeft = 'RunLeft',
	Jump = 'Jump',
	Crouch = 'Crouch',
	Fire = 'Fire',
}

enum InternalAction {
	Resize = 'Resize',
	Fall = 'Fall',
}

enum ExternalAction {
	SetKeyboardConfig = 'SetKeyboardConfig',
	SetPosition = 'SetPosition',
	SetActions = 'SetActions',
	SetState = 'SetState',
	SetDirection = 'SetDirection',
}

enum CharacterPosition {
	OnTile = 'OnTile',
	InAir = 'InAir',
	InWater = 'InWater',
}

enum CharacterState {
	Standing = 'Standing',
	Running = 'Running',
	Jumping = 'Jumping',
	Sliding = 'Sliding',
	Crouching = 'Crouching',
	Swimming = 'Swimming',
	Stomping = 'Stomping',
	Dying = 'Dying',
	Firing = 'Firing',
}

enum Direction {
	// Up = 'Up',
	Right = 'Right',
	// Down = 'Down',
	Left = 'Left',
}

enum KeyboardAction {
	KeyDown = 'KeyDown',
	KeyUp = 'KeyUp',
}

export {
	CharacterAction,
	InternalAction,
	ExternalAction,
	CharacterPosition,
	CharacterState,
	Direction,
	KeyboardAction,
};
