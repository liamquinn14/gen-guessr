"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { ChangeEvent, useEffect, useRef, useState } from "react"
import { useSocket } from "../../../../hooks/useSocket"

export default function JoinLobby() {
    const socket = useSocket();
    if(!socket) return null;
    const { joinLobby } = socket;
    const [lobbyCode, setLobbyCode] = useState<string>("")
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        inputRef.current?.focus()
    }, [])

    function handleCodeChange(e: ChangeEvent<HTMLInputElement>) {
        setLobbyCode(e.target.value)
    }

    function handleJoin() {
        console.log("Joining lobby with code: ", lobbyCode)
        joinLobby(lobbyCode)
    }

    return (
        <div className="flex flex-col items-center justify-center w-screen h-dvh bg-zinc-950">
            <h1 className="text-3xl text-yellow-300 font-semibold w-4/5 md:w-2/3 text-center mb-6">Join Lobby</h1>
            <Input type="text" placeholder="e.g. abcdef" className="w-48 text-lg placeholder:text-lg" maxLength={6} onChange={handleCodeChange} value={lobbyCode} ref={inputRef}/>
            <Button className="mt-6" onClick={handleJoin}>JOIN NOW</Button>
            <Link href="/play">
                <Button className="bg-red-700 text-red-50 mt-6 hover:bg-red-800">BACK</Button>
            </Link>
        </div>
    )
}