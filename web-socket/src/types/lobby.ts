import { Player } from "./player";

export type Lobby = {
    id: string;
    mode: string;
    players: Player[];
    gameScreen: string;
    round: number;
}

