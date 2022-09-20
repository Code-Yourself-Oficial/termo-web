import { Component, OnInit } from '@angular/core';
import { BoardStateService } from 'src/app/services/state/board.state.service';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss']
})
export class KeyboardComponent implements OnInit {
  rowOneLetters = ['Q','W','E','R','T','Y','U','I','O','P']
  rowTwoLetters = ['A','S','D','F','G','H','J','K','L']
  rowThreeLetters = ['Z','X','C','V','B','N','M']

  constructor(private boardState: BoardStateService) { }

  ngOnInit(): void {
  }

  onKeyClick(key: string) {
    this.boardState.onKeyPress(key);
  }
}
