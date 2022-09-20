import { Component } from '@angular/core';
import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss']
})
export class ScoreboardComponent {
  players = [{
    name: '',
    tries: 0,
    time: 0,
    currentPlayer: true
  }];

  isDailyScore = true;

  constructor(private matchService: MatchService) {
    this.getDashboard();
  }

  changeBoard() {
    this.isDailyScore = !this.isDailyScore;
    this.getDashboard();
  }

  getDashboard() {
    var userId = localStorage.getItem('userId');
    this.matchService.getScoreboard(this.isDailyScore)
    .subscribe(scoreboard => {
      this.players = scoreboard.items.map(p => {return{
        currentPlayer: p.userId == userId,
        name: p.name,
        tries: p.tries,
        time: p.time
      }});
    })
  }
}
