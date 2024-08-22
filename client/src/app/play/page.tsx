"use client"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Menu() {
    return (
        <div className="flex flex-col items-center justify-center w-screen h-dvh bg-zinc-950">
            <h1 className="text-3xl text-yellow-300 font-semibold w-4/5 md:w-2/3 text-center mb-4">Gen Guessr</h1>
            <Link href="/play/create-lobby" className="mb-4">
                <Button>CREATE LOBBY</Button>
            </Link>
            <Link href="/play/join-lobby">
                <Button>JOIN LOBBY</Button>
            </Link>
            <Link href="/">
                <Button className="bg-red-700 text-red-50 mt-6 hover:bg-red-800">BACK</Button>
            </Link>
        </div>
    )
}