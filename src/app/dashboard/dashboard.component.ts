import { Component, OnInit } from '@angular/core';
import { CardModel } from '../models/card-model';
import { DashboardConstants } from './dashboard.constants';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public title = 'Dashboard';
  public cardObjectArray: CardModel[] = DashboardConstants.cardObjectArray.map(status => ({ ...status }));

  constructor() { }

  ngOnInit(): void {

  }

}
