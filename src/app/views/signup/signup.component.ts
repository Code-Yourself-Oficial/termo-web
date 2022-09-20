import { Component } from '@angular/core';
import { UserStateService } from 'src/app/services/state/user.state.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  name!: string;
  email!: string;
  password!: string;

  constructor(private userStateService: UserStateService) {
  }

  signup() {
    this.userStateService.signup({
      name: this.name,
      email: this.email,
      password: this.password
    });
  }
}
