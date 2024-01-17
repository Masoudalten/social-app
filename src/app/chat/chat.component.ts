import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserAuthService } from '../services/UserService.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit {
  users: any[] = [];
  searchText: string = '';
  showChat = false;


  constructor(private userService: UserAuthService) { }

  ngOnInit() {
    this.users = this.userService.users
  }

  onSearchTextEntered(searchValue: string) {
    this.searchText = searchValue;
  }

  get isUserLoggedIn(): boolean {
    return this.userService.getIsUserLoggedIn();
  }

  userToDisplay(user: any): boolean {
    if (this.isUserLoggedIn) {
      const loggedInUserId = this.userService.session.id;
      return this.userService.getIsUserLoggedIn() && user.id !== loggedInUserId &&
        (this.searchText === '' ||
          user.name.toLowerCase().includes(this.searchText) ||
          user.lastname.toLowerCase().includes(this.searchText));

    }
    else {
      return false
    }
  }

  openChat() {
    this.showChat = true;
  }

  toggleChat() {
    this.showChat = !this.showChat;
  }

}
