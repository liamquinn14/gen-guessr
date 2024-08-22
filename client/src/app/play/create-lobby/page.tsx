"use client"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSocket } from "../../../../hooks/useSocket";

export default function CreateLobby() {
    const socket = useSocket();
    if(!socket) return null;
    const { createLobby } = socket;
    return (
      <div className="flex flex-col items-center justify-center w-screen h-dvh bg-zinc-950">
        <h1 className="text-3xl text-yellow-300 font-semibold w-4/5 md:w-2/3 text-center">
          Create Lobby
        </h1>
        <h2 className="text-xl italic text-zinc-100 w-3/4 md:w-1/2 text-center m-4">
          Choose a game mode:
        </h2>
        <Button onClick={() => createLobby("images")} className="mb-4">
          Images
        </Button>
        <Button onClick={() => createLobby("text")}>Text</Button>
        <Link href="/play">
          <Button className="bg-red-700 text-red-50 mt-6 hover:bg-red-800">
            BACK
          </Button>
        </Link>
      </div>
    );
}