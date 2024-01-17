import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../services/UserService.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit {
  users: any[] = [];
  searchText: string = '';

  constructor(private userService: UserAuthService) { }

  ngOnInit() {
    this.users = this.userService.users
  }

  onSearchTextEntered(searchValue: string) {
    this.searchText = searchValue;
    //console.log(this.searchText)
  }

}
