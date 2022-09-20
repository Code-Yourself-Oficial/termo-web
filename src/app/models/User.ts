import Dashboard from "./Dashboard"

export interface User {
  id?: string,
  name: string,
  email: string
  password: string
}

export interface UserState {
  user: User,
  dashboard: Dashboard
}