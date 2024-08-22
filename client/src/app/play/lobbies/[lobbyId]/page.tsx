"use client"
import NotFound from "./not-found"
import PreGame from "@/components/game-comps/pre-game"
import ImgAnswer from "@/components/game-comps/img-answer"
import ImgQuestion from "@/components/game-comps/img-question"
import TextAnswer from "@/components/game-comps/text-answer"
import TextQuestion from "@/components/game-comps/text-question"
import Scoreboard from "@/components/game-comps/scoreboard"
import { useSocket } from "../../../../../hooks/useSocket"
interface LobbyProps {
    params: {
        lobbyId: string
    }
}

export default function Lobby({ params }: LobbyProps) {

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
        { gameScreen === "img-answer" && <ImgAnswer /> }
        { gameScreen === "text-question" && <TextQuestion /> }
        { gameScreen === "text-answer" && <TextAnswer /> }
        { gameScreen === "scoreboard" && <Scoreboard /> }
        </>   
    )
}