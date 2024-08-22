import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-dvh bg-zinc-950">
      <h1 className="text-3xl text-yellow-300 font-semibold w-4/5 md:w-2/3 text-center mb-4">Gen Guessr</h1>
      <h2 className="text-xl italic text-zinc-100 w-3/4 md:w-1/2 text-center mb-8">Game to identify AI-generated content</h2>
      <Link href="/play">
        <Button>START GAME</Button>
      </Link>
    </div>
  );
}
