import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { NotifierService } from "angular-notifier";
import { catchError, Observable } from "rxjs";
import Dashboard from "src/app/models/Dashboard";
import Login from "src/app/models/Login";
import { User, UserState } from "src/app/models/User";
import { LoaderService } from "../loader.service";
import { UserService } from "../user.service";
import { BoardStateService } from "./board.state.service";
import { StateService } from "./state.service";

const initialState: UserState = {
  user: {
    name: '',
    email: '',
    password: '',
  },
  dashboard: {
    averageOfAttempts: [],
    averageTime: 0,
    bestTime: 0,
    lastTime: 0,
    matchesCount: 0,
    victoriesRate: 0
  }
};

@Injectable({
  providedIn: 'root'
})
export class UserStateService extends StateService<UserState> {
  constructor(
    private router: Router,
    private userService: UserService,
    private notifierService: NotifierService,
    private boardStateService: BoardStateService,
    private loaderService: LoaderService,
  ) {
    super(initialState)
  }

  user: Observable<User> = this.select((state) => state.user);
  dashboard: Observable<Dashboard> = this.select((state) => state.dashboard);

  loadUser() {
    this.loaderService.show();

    var userId = localStorage.getItem('userId');
    if(userId != undefined) {
      this.userService.get(userId)
      .subscribe(p => {
        this.setState({...{user: p}});
        this.loaderService.hide();
      })
    }
  }

  loadDashboard() {
    this.loaderService.show();

    var userId = localStorage.getItem('userId');
    if(userId != undefined) {
      this.userService.getDashboard(userId)
      .subscribe(p => {
        this.setState({...{dashboard: p}});
        this.loaderService.hide();
      })
    }
  }

  signup(user: User) {
    this.loaderService.show();
    this.userService.signup(user)
    .subscribe(p => {
      this.setState({...{user: p}});
      localStorage.setItem("userId", p.id!)
      this.loaderService.hide();
      this.router.navigate([''])
    })
  }

  login(login: Login) {
    this.loaderService.show();
    this.userService.login(login)
    .pipe(catchError<User, Observable<User>>((error: HttpErrorResponse) => {
      if(error.status == 401) {
        this.loaderService.hide();
        this.notifierService.notify('warning', 'Email ou senha inválidos!');
      }
      return new Observable();
    }))
    .subscribe(p => {
      this.loaderService.hide();
      this.setState({...{user: p}});
      localStorage.setItem("userId", p.id!)
      this.loadDashboard();
      this.router.navigate([''])
    })
  }

  logout() {
    this.setState(initialState);
    localStorage.clear();
    this.boardStateService.clear();
    this.router.navigate(['/login'])
  }

  update(user: User) {
    this.loaderService.show();
    this.userService.update(user)
    .subscribe(p => {
      this.loaderService.hide();
      this.setState({
        ...
        {user: p}
      });
      this.notifierService.notify('success', 'Dados atualizados com sucesso!')
    })
  }
}