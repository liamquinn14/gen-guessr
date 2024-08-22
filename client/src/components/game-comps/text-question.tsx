"use client"

import { Button } from "@/components/ui/button"

export default function TextQuestion() {
    return (
        <div className="flex flex-col items-center justify-center w-screen h-dvh bg-zinc-950">
            <h1 className="text-2xl text-zinc-50 font-semibold">True or False?</h1>
            <p className="text-xl text-zinc-50 font-semibold">The first computer virus was created in 1983.</p>
            <Button className="mt-8">True</Button>
            <Button className="mt-4">False</Button>
        </div>
    )
}