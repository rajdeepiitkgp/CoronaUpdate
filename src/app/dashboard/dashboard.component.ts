import { Component, OnInit } from '@angular/core';
import { CardModel } from '../models/card-model';
import { DashboardConstants } from './dashboard.constants';
import { SummaryService } from '../service/summary.service';
import { DatePipe } from '@angular/common';


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
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.fetchSummaryData();
  }

  public fetchSummaryData() {
    this.summarySrvc.fetchAllData().subscribe(result => {
      const total = result.cases as number;
      const deaths = result.deaths as number;
      const deathRate = (deaths / total) * 100;
      const date = new Date(result.updated);
      const formattedDate = 'Last update ' + this.datePipe.transform(date, 'MMM d, yyyy');
      this.cardObjectArray[0].value = this.formatNumber(total);
      this.cardObjectArray[1].value = this.formatNumber(result.recovered as number);
      this.cardObjectArray[1].footerText = formattedDate;
      this.cardObjectArray[2].value = this.formatNumber(deaths);
      this.cardObjectArray[2].footerText = formattedDate;
      this.cardObjectArray[3].value = this.formatNumber(deathRate) + ' %';
    });
  }

  public formatNumber(value: number): string {
    const result = value.toLocaleString('en-us', { maximumFractionDigits: 2 });
    return result as string;
  }

}
