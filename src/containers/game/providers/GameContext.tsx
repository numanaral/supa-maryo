import { createContext } from 'react';
import { Game } from 'game/types';

const GameContext = createContext<Game.Context | undefined>(undefined);
GameContext.displayName = 'GameContext';

export default GameContext;
