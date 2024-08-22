"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function ImgQuestion() {
    return (
        <div className="flex flex-col items-center justify-center w-screen h-dvh bg-zinc-950">
            <h1 className="text-2xl text-zinc-50 font-semibold">Real or AI?</h1>
            <Image
                src="https://images.unsplash.com/photo-1564541558234-ef406c118d0c?q=80&w=2946&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Either a real or AI generated image"
                width={500}
                height={500}
            />
            <Button className="mt-8">REAL</Button>
            <Button className="mt-4">AI</Button>
        </div>
    )
}