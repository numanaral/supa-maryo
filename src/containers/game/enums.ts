enum CharacterAction {
	RunRight = 'RunRight',
	RunLeft = 'RunLeft',
	Jump = 'Jump',
	Crouch = 'Crouch',
	Fire = 'Fire',
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

export { CharacterAction, CharacterPosition, CharacterState, Direction };
