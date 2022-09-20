import { Component } from '@angular/core';
import { User } from 'src/app/models/User';
import { UserStateService } from 'src/app/services/state/user.state.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  user!: User;

  constructor(private userStateService: UserStateService) {
    userStateService.user.subscribe(user => {
      this.user = user;
    })
    userStateService.loadUser();
    userStateService.loadDashboard();
  }

  save() {
    this.userStateService.update(this.user);
  }
}
