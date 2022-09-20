import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BoardStateService } from 'src/app/services/state/board.state.service';
import { UserStateService } from 'src/app/services/state/user.state.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent {
  rows = this.boardState.rows;
  currentRow = this.boardState.activeRowIndex;

  constructor(
    private boardState: BoardStateService,
    private userStateService: UserStateService,
    route: Router
  ) {
    var userId = localStorage.getItem('userId');
    if(userId == undefined || userId == null) {
      route.navigate(['/login'])
      return;
    }

    boardState.load();
  }

  logout() {
    this.userStateService.logout();
  }
}
