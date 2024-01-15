import { Component, DoCheck } from '@angular/core';
import { UserAuthService } from '../services/UserService.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements DoCheck {
  user$: Observable<any> = of(null);

  constructor(private userService: UserAuthService) { }

  get isUserLoggedIn(): boolean {
    return this.userService.getIsUserLoggedIn();
  }

  ngDoCheck() {
    if (this.userService.getIsUserLoggedIn()) {
      this.user$ = this.userService.getUser(this.userService.session.id);
    }
  }
}
