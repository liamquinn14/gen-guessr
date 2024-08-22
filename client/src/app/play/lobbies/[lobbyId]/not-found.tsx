import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center w-screen h-dvh bg-zinc-950">
            <h1 className="text-3xl text-yellow-300 font-semibold w-4/5 md:w-2/3 text-center mb-6">Lobby Not Found</h1>
            <Link href="/play/join-lobby">
                <Button className="mt-6">TRY ANOTHER LOBBY</Button>
            </Link>
        </div>
    )
}