import { HttpClientModule } from '@angular/common/http';
import { NgClass } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './views/signup/signup.component';
import { LoginComponent } from './views/login/login.component';
import { HoverDirective } from './directives/hover.directive';
import { LetterComponent } from './components/letter/letter.component';
import { BoardRowComponent } from './components/board-row/board-row.component';
import { GameComponent } from './views/game/game.component';
import { NotifierModule } from 'angular-notifier';
import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component';
import { ngxLoadingAnimationTypes, NgxLoadingModule } from 'ngx-loading';
import { KeyboardComponent } from './components/keyboard/keyboard.component';
import { ScoreboardComponent } from './views/scoreboard/scoreboard.component';
import { TimePipe } from './pipes/time.pipe';
import { ProfileComponent } from './views/profile/profile.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    HoverDirective,
    LetterComponent,
    BoardRowComponent,
    GameComponent,
    PageNotFoundComponent,
    KeyboardComponent,
    ScoreboardComponent,
    TimePipe,
    ProfileComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NotifierModule.withConfig({
      position: {
        horizontal: { position: 'middle' },
        vertical: { position: 'top', distance: 60 },
      },
      behaviour: {
        showDismissButton: false,
        stacking: 1
      }
    }),
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.circle,
      backdropBackgroundColour: "rgba(0,0,0,0.6)",
      secondaryColour: "#264653"
    }),
    NgxChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
