import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { BoardRow } from 'src/app/models/Board';
import { BoardStateService } from 'src/app/services/state/board.state.service';

export enum Key {
  ArrowLeft = 'ArrowLeft',
  ArrowRight = 'ArrowRight',
  Backspace = 'Backspace',
  Enter = 'Enter',
}

@Component({
  selector: 'app-board-row',
  templateUrl: './board-row.component.html',
  styleUrls: ['./board-row.component.scss']
})
export class BoardRowComponent implements OnInit {
  @Input()
  boardRow!: BoardRow;

  constructor(private boardState: BoardStateService) { }

  ngOnInit(): void {
    if(!this.boardRow.disabled) {
      this.boardRow.activeLetterIndex = 0;
    }
  }

  @HostListener('window:keyup', ['$event'])
  onKeyPress(event: KeyboardEvent) {
    if(this.boardRow.activeLetterIndex == -1)
      return;

    var key = event.key;

    this.boardState.onKeyPress(key);
  }

  selectLetter(index: number) {
    this.boardRow.activeLetterIndex = index;
  }
}
