import NotFound from "./not-found"
import PreGame from "@/components/game-comps/pre-game"
import ImgQuestion from "@/components/game-comps/img-question"
import TextQuestion from "@/components/game-comps/text-question"
import ImgAnswer from "@/components/game-comps/img-answer"
import TextAnswer from "@/components/game-comps/text-answer"
import Scoreboard from "@/components/game-comps/scoreboard"
interface LobbyProps {
    params: {
        lobbyId: string
    }
}

export default function Lobby({ params }: LobbyProps) {

    const { lobbyId } = params

    // if lobby id is not found, show not found page

    return (
        <>
        </>   
    )
}