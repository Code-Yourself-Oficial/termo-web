import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './views/game/game.component';
import { LoginComponent } from './views/login/login.component';
import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component';
import { ProfileComponent } from './views/profile/profile.component';
import { ScoreboardComponent } from './views/scoreboard/scoreboard.component';
import { SignupComponent } from './views/signup/signup.component';

const routes: Routes = [
  {
    path: '',
    title: 'Termo',
    component: GameComponent  
  }, {
    path: 'cadastrar',
    title: 'Cadastrar',
    component: SignupComponent
  }, {
    path: 'login',
    title: 'Login',
    component: LoginComponent
  }, {  
    path: 'placar',
    title: 'Placar',
    component: ScoreboardComponent
  }, {
    path: 'perfil',
    title: 'Perfil',
    component: ProfileComponent
  }, {
    path: '**',
    title: '404 | Página não encontrada',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
