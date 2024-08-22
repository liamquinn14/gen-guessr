"use client"

import NotFound from "./not-found"
import PreGame from "@/components/game-comps/pre-game"
import ImgQuestion from "@/components/game-comps/img-question"
import TextQuestion from "@/components/game-comps/text-question"
import ImgAnswer from "@/components/game-comps/img-answer"
import TextAnswer from "@/components/game-comps/text-answer"
import Scoreboard from "@/components/game-comps/scoreboard"
import { useSocket } from "../../../../../hooks/useSocket"

interface LobbyProps {
    params: {
        lobbyId: string
    }
}

export default function Lobby({ params }: LobbyProps) {

    // if lobby id is not found on server, show not found page
    const { lobbyId } = params
    const socket = useSocket();
    if (!socket || !lobbyId) {
        return <NotFound />
    }
    const { state } = socket;
    const { gameScreen } = state!;

    return (
        <>
            { gameScreen === "pre-game" && <PreGame /> }
            { gameScreen === "img-question" && <ImgQuestion /> }
            { gameScreen === "text-question" && <TextQuestion /> }
            { gameScreen === "img-answer" && <ImgAnswer /> }
            { gameScreen === "text-answer" && <TextAnswer /> }
            { gameScreen === "scoreboard" && <Scoreboard /> }
        </>   
    )
}