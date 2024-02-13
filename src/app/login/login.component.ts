import { Component, Output } from '@angular/core';
import { UserAuthService } from '../services/UserService.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../interface/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  isUserLoggedIn: boolean = false;
  @Output() user: User | undefined;

  form: FormGroup = this.fb.group({
    username: ['', Validators.required]
  })
  constructor(private userService: UserAuthService, private fb: FormBuilder, private router: Router) { }

  login() {
    let user = this.userService.login(this.form.value.username);
    if (!user) {
      alert('invalid username')
    } else {
      this.router.navigate(['/profile', user.id])
      this.userService.setUser(user)
    }
  }
}
