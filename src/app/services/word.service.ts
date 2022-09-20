import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Dashboard from '../models/Dashboard';
import Login from '../models/Login';
import { User } from '../models/User';
import Word from '../models/Word';

@Injectable({
  providedIn: 'root'
})
export class WordService {
  private apiUrl = 'https://localhost:7077/api/words'

  constructor(private http: HttpClient) { }

  get(): Observable<Word> {
    var data = new Date();
    return this.http.get<Word>(`${this.apiUrl}/${this.getDateString(data)}`)
  }

  private getDateString(date: Date) {
    var year = date.getFullYear();
    var month = date.getMonth();
    var day = date.getDate()

    return '' + year + '-' + (month <= 9 
      ? (month + 1).toString().padStart(2, '0') 
      : month + 1) + '-' + (day <= 9 ? (day).toString().padStart(2, '0') : day);
  }
}
