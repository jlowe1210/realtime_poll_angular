import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { socket } from '../app.module';

@Injectable({ providedIn: 'root' })
export class SocketService {
  private updatedPoll = new Subject();

  private joinRoom(id: string | null) {
    socket.emit('joinRoom', id);
  }

  private getUpdatedPoll() {
    socket.on('updatedPoll', (updatedPoll) => {
      this.updatedPoll.next({ poll: updatedPoll });
    });
  }

  public handleDisconnect() {
    let currentSocket: any;

    socket.on('connect', () => {
      currentSocket = socket.id;
    });

    socket.io.on('reconnect', () => {
      socket.emit('getLostData', currentSocket);
    });

    socket.on('disconnect', () => {
      socket.emit('Disconnecting', currentSocket);
    });
  }

  public leaveRoomAndUnSub(id: string | null) {
    socket.off('updatedPoll');
    socket.emit('leaveRoom', id);
  }

  public updatedPollAsObservable(id: string | null) {
    this.joinRoom(id);
    this.getUpdatedPoll();
    return this.updatedPoll.asObservable();
  }
}
