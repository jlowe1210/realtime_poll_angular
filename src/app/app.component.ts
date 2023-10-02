import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { SocketService } from './Services/Socket.Service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private http: HttpClient, private socket: SocketService) {}

  ngOnInit(): void {
    // this.http.get('/api/test').subscribe();

    this.socket.handleDisconnect();
  }
}
