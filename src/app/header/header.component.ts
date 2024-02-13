import { Component, DoCheck, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { UserAuthService } from '../services/UserService.service';
import { Observable } from 'rxjs';
import { User } from '../interface/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnChanges {
  user$: User | undefined;

  constructor(private userService: UserAuthService) { }

  get isUserLoggedIn(): boolean {
    return this.userService.getIsUserLoggedIn();
  }

  ngOnInit() {
    this.userService.getUsers().subscribe(() => {
      if (this.isUserLoggedIn) {
        this.userService.getUser(this.userService.session.id).subscribe({
          next: (user: any) => {
            this.user$ = user;
          },
          error: (err: any) => {
            console.error('Error fetching user:', err);
          }
        });
      }

    });

    this.userService.user?.subscribe((user: any) => {
      if (user) {
        this.user$ = user;
      }
    })


  }

  // console.log(this.userService.user)
  // this.userService.getUsers().subscribe(() => {
  //   this.userService.getUser(this.userService.session.id).subscribe({
  //     next: (user: any) => {
  //       this.user$ = user;
  //     },
  //     error: (err: any) => {
  //       console.error('Error fetching user:', err);
  //     }
  //   });
  // });


  ngOnChanges(changes: SimpleChanges) {

  }

  getUser() {
    this.userService.getUser(this.userService.session.id).subscribe({
      next: (user: any) => {
        this.user$ = user;
        console.log(user);
      }
    });
  }
  // this.loadUser();
  // console.log(this.userService.session.id)
  // this.userService.getUser(this.userService.session.id).subscribe((res)=>{
  //   console.log(res)
  // });


  // private loadUser(): void {
  //   if (this.isUserLoggedIn) {
  //     this.user$ = this.userService.getUser(this.userService.session.id);
  //   }
  // }
}
