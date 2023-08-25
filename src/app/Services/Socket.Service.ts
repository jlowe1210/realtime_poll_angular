import { io } from 'socket.io-client';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
const socket = io('/', {
  withCredentials: true,
  reconnection: true,
});

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

    socket.on('reconnecting', () => {
      socket.emit('reconnect');
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
