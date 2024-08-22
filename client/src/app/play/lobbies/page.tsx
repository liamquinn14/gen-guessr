'use client';
import { useSocket } from "../../../../hooks/useSocket";

export default function Menu() {
    const socket = useSocket();
    if(!socket) return null;
    const { messages, message, setMessage, sendMessage } = socket;
    return (
    <div className="flex flex-col items-center justify-center w-screen h-dvh bg-zinc-950">
        {messages.map((message, i) => (
            <div className="text-white" key={i}>{message}</div>
        ))}
        <form onSubmit={sendMessage}>
            <input type="text" value={message} onChange={setMessage} />
            <button type="submit">Send</button>
        </form>
    </div>
  );
}