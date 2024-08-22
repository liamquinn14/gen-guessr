"use client";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { Socket, io } from "socket.io-client";

export type Lobby = {
  id: string;
  mode: "images" | "text";
  players: Player[];
  gameScreen: string;
  round: number;
};

export type Player = {
  id: string;
  name: string;
  score: number;
  isReady: boolean;
};

type SocketContext = {
  createLobby: (mode: "images" | "text") => void;
  joinLobby: (id: string) => void;
  state: Lobby | null;
};

const SocketContext = createContext<SocketContext | null>(null);


export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  
  const [state, setState] = useState<Lobby | null>(null);
  const ws = useRef<Socket | null>(null);

  useEffect(() => {
    const socket = io("http://localhost:82");

    socket.on("join-lobby", (lobby: Lobby) => {
      console.log("Joined lobby: ", lobby);
      setState(lobby);
      router.push(`/play/lobbies/${lobby.id}`); 
    });

    ws.current = socket;
    return () => {
      socket.disconnect();
    };
  }, []);

  const createLobby = (mode: 'images' | 'text') => {
    ws.current?.emit("create-lobby", mode);
  }

  const joinLobby = (id: string) => {
    ws.current?.emit("join-lobby", id);
  }

  return (
    <SocketContext.Provider
      value={
        {
          createLobby,
          joinLobby,
          state
        } as SocketContext
      }
    >
      {children}
    </SocketContext.Provider>
  );
};
