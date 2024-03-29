import { Component } from '@angular/core';
import { ChatService } from './services/ChatService.service';
import { UserAuthService } from './services/UserService.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'social-app';
  showChat = false;

  constructor(public chatService: ChatService, private userService: UserAuthService) { }

  ngOnInit() {

  }

}
