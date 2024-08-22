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
    
    const lobby = {
      id,
      mode,
      players: [client.id],
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

    lobby.players.push(client.id);
    this.server.to(client.id).emit('join-lobby', lobby);
    //this.server.to(lobby.players).emit('lobby-updated', lobby); //TODO: update all clients to new lobby
  }


}
