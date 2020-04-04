import { Component, OnInit } from '@angular/core';
import { CardModel } from '../models/card-model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public title = 'Dashboard';
  public cardObjectArray: CardModel[];

  constructor() { }

  ngOnInit(): void {
    this.cardObjectArray = [
      {
        footerIcon: 'loyalty',
        footerText: 'Tracked from Johns Hopkings',
        avatarIcon: 'local_hotel',
        title: 'Total Infected',
        avatarClass: 'mat-bg-orange'
      },
      {
        footerIcon: 'date_range',
        footerText: 'Last update Apr 4, 2020',
        avatarIcon: 'sentiment_very_satisfied',
        title: 'Recovered',
        avatarClass: 'mat-bg-green'
      },
      {
        footerIcon: 'date_range',
        footerText: 'Last update Apr 4, 2020',
        avatarIcon: 'mood_bad',
        title: 'Total Death',
        avatarClass: 'mat-bg-red'
      },
      {
        footerIcon: 'update',
        footerText: '(total death)/ (total infected)',
        avatarIcon: 'airline_seat_flat',
        title: 'Death Rate',
        avatarClass: 'mat-bg-gray'
      }
    ];
  }

}
