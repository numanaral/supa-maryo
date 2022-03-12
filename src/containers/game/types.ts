namespace Game {
	// export type Levels = `${1}-${1}`;
	export type Levels = '1-1';

	export interface State extends Required<PlayerOptions> {
		scale: number;
	}

	export interface PlayerOptions {
		level?: Levels;
	}
}

export type { Game };
