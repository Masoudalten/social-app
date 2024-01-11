import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../services/UserService.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  users: any[] = [];

  constructor(private userService: UserAuthService) { }

  ngOnInit() {
    this.users = this.userService.users
  }

}
