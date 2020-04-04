import { Component, OnInit } from '@angular/core';
import { CardModel } from '../models/card-model';
import { DashboardConstants } from './dashboard.constants';
import { SummaryService } from '../service/summary.service';
import { EventAggrigatorService } from '../service/event-aggrigator.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public title = 'Dashboard';
  public cardObjectArray: CardModel[] = DashboardConstants.cardObjectArray.map(status => ({ ...status }));

  constructor(
    private summarySrvc: SummaryService,
    private eventAggSrvc: EventAggrigatorService
  ) { }

  ngOnInit(): void {
    this.fetchSummaryData();
  }

  public fetchSummaryData() {
    this.eventAggSrvc.setSpinnerFlag(true);
    this.summarySrvc.fetchAllData().subscribe(result => {
      const total = result.cases as number;
      const deaths = result.deaths as number;
      const deathRate = (deaths / total) * 100;
      this.cardObjectArray[0].value = this.formatNumber(total);
      this.cardObjectArray[1].value = this.formatNumber(result.recovered as number);
      this.cardObjectArray[2].value = this.formatNumber(deaths);
      this.cardObjectArray[3].value = this.formatNumber(deathRate) + ' %';
      this.eventAggSrvc.setSpinnerFlag(false);
    });
  }

  public formatNumber(value: number): string {
    const result = value.toLocaleString('en-us', { maximumFractionDigits: 2 });
    return result as string;
  }

}
