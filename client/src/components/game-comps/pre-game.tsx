"use client"
import NotFound from "@/app/play/lobbies/[lobbyId]/not-found";
import { Lobby, useSocket } from "../../../hooks/useSocket";
import { Button } from "../ui/button";

export default function PreGame() {

    const socket = useSocket();
    if (!socket) {
        return <NotFound />;
    }
    const { state, clientId, updateLobby } = socket;
    const { players, mode, id } = state!;

    const clientPlayer = players.find((player) => player.id === clientId);
    const isHost = !!players.find((player) => player.id === clientId)?.isHost

    const playerElements = players.map((player) => {
        return (
            <p key={player.id} className="text-zinc-50 text-xl w-3/4 md:w-1/2 capitalize text-center">{player.name}</p>
        )
    })

    function startGame() {
        console.log("Starting game...");
        const startedGameState = {
            ...state,
            gameScreen: "img-question"
        }
        updateLobby(startedGameState as Lobby);
    }

    return (
        <div className="flex flex-col items-center justify-center w-screen h-dvh bg-zinc-950">
            <h1 className="font-semibold text-2xl text-yellow-300">Waiting Room</h1>
            <p className="text-zinc-50 text-4xl mt-4 text-center">{id}</p>
            <p className="text-zinc-100 text-xl mt-4 w-3/4 md:w-1/2 text-center">Share the code with your friends!</p>
            <p className="text-zinc-100 text-xl mt-4 w-3/4 md:w-1/2 text-center capitalize">Mode: {mode}</p>
            <h3 className="text-yellow-300 text-xl mt-6 text-center font-semibold mb-2">Players:</h3>
            {playerElements}
            { isHost && <Button onClick={startGame} className="mt-6">START GAME</Button> }
        </div>
    )
}