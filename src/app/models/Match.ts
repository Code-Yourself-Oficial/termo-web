export interface Match {
  id?: string;
  userId: string;
  wordId: string;
  success?: string;
  moves?: MoveResult[]
}

export interface MoveResult {
  letters: LetterResult[];
  success: boolean;
}

export interface LetterResult {
  value: string;
  exists: boolean
  rightPlace: boolean
}