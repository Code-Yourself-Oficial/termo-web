export interface Scoreboard {
  items: ScoreboardItem[]
}

export interface ScoreboardItem {
  userId: string,
  name: string,
  tries: number,
  time: number
}