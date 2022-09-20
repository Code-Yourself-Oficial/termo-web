import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Dashboard from '../models/Dashboard';
import Login from '../models/Login';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://localhost:7077/api/users'

  constructor(private http: HttpClient) { }

  signup(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  login(login: Login): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/login`, login);
  }

  update(user: User): Observable<User> {
    return this.http.put<User>(this.apiUrl, user);
  }

  get(userId: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${userId}`)
  }

  getDashboard(userId: string): Observable<Dashboard> {
    return this.http.get<Dashboard>(`${this.apiUrl}/${userId}/dashboard`)
  }
}
