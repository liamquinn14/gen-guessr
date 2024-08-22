import { Player } from "./player";

export type Lobby = {
    id: string;
    mode: 'images' | 'text';
    players: Player[];
    gameScreen: string;
    round: number;
}

