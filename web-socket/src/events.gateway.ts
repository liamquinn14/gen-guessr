import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway(82, {
  // namespace: 'events',
  cors: {
    origin: '*', // Add more origins as needed
    credentials: false,
  },
})
export class EventsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  private state = {
    clients: [],
    lobbies: [],
  }

  afterInit(server: Server) {
    console.log('WebSocket initialized');
  }

  handleConnection(client: any, ...args: any[]) {
    this.state.clients.push({ id: client.id });
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: any) {
    this.state.clients = this.state.clients.filter((c) => c.id !== client.id);
    console.log(`Client disconnected: ${client.id}`);
  }
  
  @SubscribeMessage('create-lobby')
  handleCreateLobby(client: any, mode: "images" | "text") {
    const id = Math.random().toString(36).substr(2, 6);
    
    const player = {
      id: client.id,
      name: 'Player 1',
      score: 0,
      isReady: false,
    };

    const lobby = {
      id,
      mode,
      players: [player],
      gameScreen: 'pre-game',
      round: 0,
    };
    
    this.state.lobbies.push(lobby);

    this.server.to(client.id).emit('join-lobby', lobby)
  }

  @SubscribeMessage('join-lobby')
  handleJoinLobby(client: any, id: string) {
    const lobby = this.state.lobbies.find((l) => l.id === id);
    if (!lobby) {
      //this.server.to(client.id).emit('lobby-not-found'); //TODO: handle issue
      console.log('Lobby not found');
      return;
    }

    lobby.players.push({
      id: client.id,
      name: `Player ${lobby.players.length + 1}`,
      score: 0,
      isReady: false,
    });

    console.log(JSON.stringify(this.state))

    this.server.to(client.id).emit('join-lobby', lobby);
    this.server.to(lobby.players.map((p) => p.id)).emit('lobby-updated', lobby); //TODO: update all clients to new lobby
  }

  @SubscribeMessage('update-player')
  handleUpdatePlayer(client: any, player: any) {
    const lobby = this.state.lobbies.find((l) => l.players.includes(client.id));
    if (!lobby) {
      //this.server.to(client.id).emit('lobby-not-found'); //TODO: handle issue
      console.log('Lobby not found');
      return;
    }

    const p = lobby.players.find((p) => p.id === client.id);
    if (!p) {
      //this.server.to(client.id).emit('player-not-found'); //TODO: handle issue
      console.log('Player not found');
      return;
    }

    this.state.lobbies = this.state.lobbies[lobby.id].players.map((p) => {
      if (p.id === client.id) {
        return player;
      }
      return p;
    })
    console.log(JSON.stringify(this.state));

    this.server.to(lobby.players.map((p) => p.id)).emit('lobby-updated', lobby);
    //this.server.to(lobby.players).emit('lobby-updated', lobby); //TODO: update all clients to new lobby
  }


}
