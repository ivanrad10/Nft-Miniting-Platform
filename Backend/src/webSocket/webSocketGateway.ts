import {
    WebSocketGateway,
    WebSocketServer,
    OnGatewayInit,
    OnGatewayConnection,
    OnGatewayDisconnect,
  } from '@nestjs/websockets';
  import { Server, Socket } from 'socket.io';
  
  @WebSocketGateway({
    cors: {
      origin: 'http://localhost:5173',
      credentials: true,
    },
  })
  export class EventsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server: Server;
  
    afterInit(server: Server) {
      console.log('WebSocket server initialized');
    }
  
    handleConnection(client: Socket, ...args: any[]) {
      console.log(`Client connected: ${client.id}`);
    }
  
    handleDisconnect(client: Socket) {
      console.log(`Client disconnected: ${client.id}`);
    }
  
    emitRegisterEvent() {
        this.server.emit('UserRegisteredEvent', { reload: true });
    }

    emitBlackListed() {
        this.server.emit('UserBlackListedEvent', { reload: true });
    }
    
    emitNftMinted() {
        this.server.emit('NftMintedEvent', { reload: true });
    }
  }
  