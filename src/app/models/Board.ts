export interface BoardRow {
  index: number;
  disabled: boolean;
  activeLetterIndex: number;
  letters: Letter[]
}

export interface BoardState {
  rows: BoardRow[];
  activeRowIndex: number;
}

export interface Letter {
  value: string,
  color: LetterColor,
  flipped?: boolean,
  animationDisabled?: boolean
}

export enum LetterColor {
  Right = '#2a9d8f',
  Place = '#f4a261',
  Wrong = '#081d27',
}