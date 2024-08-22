import NotFound from "./not-found"
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
        </>   
    )
}