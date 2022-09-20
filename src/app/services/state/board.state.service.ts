import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { NotifierService } from "angular-notifier";
import { catchError, Observable } from "rxjs";
import { BoardRow, BoardState, LetterColor } from "src/app/models/Board";
import { LetterResult, Match, MoveResult } from "src/app/models/Match";
import Word from "src/app/models/Word";
import { LoaderService } from "../loader.service";
import { MatchService } from "../match.service";
import { WordService } from "../word.service";
import { StateService } from "./state.service";

export enum Key {
  ArrowLeft = 'ArrowLeft',
  ArrowRight = 'ArrowRight',
  Backspace = 'Backspace',
  Enter = 'Enter',
}

const initialState: BoardState = {
  activeRowIndex: 0,
  rows: []
}

@Injectable({
  providedIn: 'root'
})
export class BoardStateService extends StateService<BoardState> {
  constructor(
    private matchService: MatchService,
    private notifierService: NotifierService,
    private loaderService: LoaderService,
    private wordService: WordService
    ) {
    super(initialState);
  }

  activeRowIndex: Observable<number> = this.select((state) => state.activeRowIndex);
  rows: Observable<BoardRow[]> = this.select((state) => state.rows);

  onKeyPress(key: string) {
    var activeRow = this.state.rows.filter(row => row.index == this.state.activeRowIndex)[0];

    if (/[a-zA-Z]/.test(key) && key.length == 1) {
      this.setKey(activeRow, key);
    } else if(key == Key.ArrowRight) {
      this.moveRight(activeRow);
    } else if(key == Key.ArrowLeft) {
      this.moveLeft(activeRow);
    } else if(key == Key.Backspace) {
      this.deleteKey(activeRow);
    } else if(key == Key.Enter) {
      console.log(key);
      this.addMove(activeRow.letters.map((a) => a.value).join(''));
    }
  }

  setKey(row: BoardRow, key: string) {
    row.letters[row.activeLetterIndex] = { value: key, color: LetterColor.Right };
    this.moveRight(row);
  }

  moveRight(row: BoardRow) {
    if(row.activeLetterIndex < 4) 
      row.activeLetterIndex++;
  }

  moveLeft(row: BoardRow) {
    if(row.activeLetterIndex > 0)
      row.activeLetterIndex--;
  }

  private deleteKey(row: BoardRow) {
    if(row.letters[row.activeLetterIndex].value == '')
      this.moveLeft(row)
    
    row.letters[row.activeLetterIndex] = { value: '', color: LetterColor.Right };
  }

  nextRow(result: MoveResult) {
    var nextRowIndex = this.state.activeRowIndex + 1;

    this.setState({
      activeRowIndex: result.success ? -1 : nextRowIndex,
      rows: this.setRows(result)
    })
  }

  private setRows(result: MoveResult) {
    let rows = this.state.rows.map((row) => ({
      ...row,
      activeLetterIndex: -1,
      disabled: true
    }));

    rows = this.setPreviousRow(rows);
    rows = this.setActiveRow(rows, result);
    rows = this.setNextRow(rows, result);

    return rows;
  }

  private setPreviousRow(rows: BoardRow[]) {
    if(this.state.activeRowIndex <= 0) return rows;

    var previousActiveRowIndex = this.state.activeRowIndex - 1;
    rows[previousActiveRowIndex].letters = rows[previousActiveRowIndex].letters.map(p => {
      return {
        animationDisabled: true,
        value: p.value,
        color: p.color,
        flipped: p.flipped,
      };
    });

    return rows;
  }

  private setActiveRow(rows: BoardRow[], result: MoveResult) {
    rows[this.state.activeRowIndex].activeLetterIndex = -1;
    rows[this.state.activeRowIndex].disabled = true;
    rows[this.state.activeRowIndex].letters = result.letters.map(p => {
      return {
        value: p.value,
        color: this.getLetterColor(p),
        flipped: true,
        animationDisabled: false
      };
    });

    return rows;
  }

  private setNextRow(rows: BoardRow[], result: MoveResult) {
    if(this.state.activeRowIndex >= 5) return rows;

    var nextActiveRowIndex = this.state.activeRowIndex + 1;
    rows[nextActiveRowIndex].disabled = result.success;

    return rows;
  }

  private getLetterColor(result: LetterResult) {
    if(result.exists) {
      if(result.rightPlace)
        return LetterColor.Right;
      else
        return LetterColor.Place;
    }

    return LetterColor.Wrong;
  }

  private addMove(word: string) {    
    var matchId = localStorage.getItem('matchId')?.toString();
    if(matchId != undefined)
    {
      this.matchService.addMove(matchId.toString(), word)
      .pipe(catchError<MoveResult, Observable<MoveResult>>((error: HttpErrorResponse) => {
        if(error.status == 400)
          this.notifierService.notify('warning', error.error);
          return new Observable();
      }))
      .subscribe(p => {
        this.nextRow(p);
        if(p.success) {
          this.notifierService.notify('success', 'Na mosca')
          this.endGame();
        }
        if(!p.success && this.state.activeRowIndex == 6) {
          this.notifierService.notify('warning', 'Não foi dessa vez')
        }
      });
    }
  }

  private endGame() {
    this.setState({ 
      activeRowIndex: -1,
      rows: this.state.rows.map((row) => ({
        ...row,
        disabled: true,
        activeLetterIndex: -1,
      }))
    });
  }

  load() {
    var activeRowIndex = 0;
    var rows = this.initializeRows();

    this.loaderService.show();
    this.wordService.get()
    .subscribe(p => {
      localStorage.setItem('wordId', p.id);
      var userId = localStorage.getItem('userId');
      this.matchService.getMatch(userId!)
        .pipe(catchError<Match, Observable<Match>>((error: HttpErrorResponse) => {
          if(error.status == 404) {
            this.matchService.createMatch({userId: userId!, wordId: p.id})
            .subscribe(match => {
              this.loaderService.hide();
              localStorage.setItem('matchId', match.id!)
            });            
          }
          return new Observable();
        }))
        .subscribe((match) => {
          localStorage.setItem('matchId', match.id!);
          activeRowIndex = match.success ? -1 : match.moves!.length,
          rows = this.loadRows(match.moves!, rows)
          this.setState({
            activeRowIndex,
            rows
          });
          this.loaderService.hide();
        });
    });

    this.setState({
      activeRowIndex: activeRowIndex,
      rows
    })
  }

  private initializeRows() {
    let rows: BoardRow[] = [];
    
    for (let index = 0; index < 6; index++) {
      const row: BoardRow = {
        activeLetterIndex: -1,
        disabled: index != 0,
        index: index,
        letters: [
          { value: '', color: LetterColor.Right },
          { value: '', color: LetterColor.Right },
          { value: '', color: LetterColor.Right },
          { value: '', color: LetterColor.Right },
          { value: '', color: LetterColor.Right }
        ]
      }
      rows.push(row);
    };

    return rows;
  }

  private loadRows(moves: MoveResult[], rows: BoardRow[]) {
    for (let index = 0; index < moves.length; index++) {
      const move = moves[index];
      rows[index] = {
        ...rows[index],
        disabled: true,
        activeLetterIndex: -1,
        letters: move.letters.map(p => {
          return {
            value: p.value,
            color: this.getLetterColor(p),
            flipped: true,
            animationDisabled: true
          };
        })       
      }
    }

    if (moves.length > 0 && moves.length < 6) {
      rows[moves.length].disabled = moves[moves.length-1].success;
      rows[moves.length].activeLetterIndex = 0;
    }

    return rows;
  }

  public clear() {
    this.setState(initialState);
  }
}
