import { Component, OnInit } from '@angular/core';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { UserStateService } from 'src/app/services/state/user.state.service';
import Utils from 'src/app/utils/string.utils';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  cardsData!: {}[]
  barData!: {}[]
  pieData!: {}[]
  
  color: Color = {
    group: ScaleType.Linear,
    name: '',
    selectable: true,
    domain: ['#2A9D8F', '#F4A261', '#CB466A', '#4672CB']
  }

  colorPie: Color = {
    group: ScaleType.Linear,
    name: '',
    selectable: true,
    domain: ['#2A9D8F', '#081D27']
  }

  colorBar: Color = {
    group: ScaleType.Linear,
    name: '',
    selectable: true,
    domain: ['#2A9D8F', '#2A9D8F', '#2A9D8F', '#2A9D8F', '#2A9D8F', '#2A9D8F']
  }

  constructor(userStateService: UserStateService) { 
    userStateService.dashboard.subscribe(data => {
      this.cardsData = [{
        name: 'Jogos',
        value: data.matchesCount
      },
      {
        name: 'Último tempo',
        value: Utils.convertNumberToTimeString(data.lastTime)
      },
      {
        name: 'Tempo médio',
        value: Utils.convertNumberToTimeString(data.averageTime)
      },
      {
        name: 'Melhor tempo',
        value: Utils.convertNumberToTimeString(data.bestTime)
      }];

      this.barData = data.averageOfAttempts.map((value, index) => {return {name: index + 1, value: value}});

      this.pieData = [
        {
          name: 'Vitórias (%)',
          value: data.victoriesRate
        },
        {
          name: 'Derrotas (%)',
          value: 100 - data.victoriesRate
        }
      ]
    })
  }
}
