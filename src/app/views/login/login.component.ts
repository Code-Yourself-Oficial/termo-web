import { Component } from '@angular/core';
import { UserStateService } from 'src/app/services/state/user.state.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers:[UserService]
})
export class LoginComponent {
  email!: string;
  password!: string;

  constructor(
    private userStateService: UserStateService
  ) { }

  login() {
    this.userStateService.login({
      email: this.email,
      password: this.password
    })
  }

  isDisabled() {
    return this.email == null
        || this.email == ''
        || this.password == null
        || this.password == '';
  }
}