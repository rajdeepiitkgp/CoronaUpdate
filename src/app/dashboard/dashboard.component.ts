import { Component, OnInit, OnDestroy } from '@angular/core';
import { CardModel } from '../models/card-model';
import { DashboardConstants } from './dashboard.constants';
import { SummaryService } from '../service/summary.service';
import { DatePipe } from '@angular/common';
import { forkJoin, Subscription } from 'rxjs';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  public cardObjectArray: CardModel[] = DashboardConstants.cardObjectArray.map(status => ({ ...status }));
  private dateArray: string[] = [];
  private infected: number[] = [];
  private died: number[] = [];
  private infectedDelta: number[] = [0];
  private diedDelta: number[] = [0];
  public dataLoaded: boolean;
  private watcher: Subscription;
  constructor(
    private summarySrvc: SummaryService,
    private datePipe: DatePipe
  ) { }

  ngOnDestroy(): void {
    this.watcher.unsubscribe();
  }

  ngOnInit(): void {
    this.initializeSerive();
  }

  public initializeSerive() {
    const summaryOrb = this.summarySrvc.fetchSummaryData();
    const dailyOrb = this.summarySrvc.fetchDailyData();
    this.dataLoaded = false;
    this.watcher = forkJoin([summaryOrb, dailyOrb]).subscribe(([summaryData, dailyData]) => {
      this.processSummaryData(summaryData);
      this.processDailyData(dailyData);
      this.dataLoaded = true;
    });

  }

  public processSummaryData(result: any) {
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
  }

  public processDailyData(result: any[]) {
    let prevEl: number = result[0].deaths.total as number;
    result.forEach((el, index) => {
      this.dateArray.push(el.reportDate);
      this.infected.push(el.totalConfirmed as number);
      const diedNow: number = el.deaths.total as number;
      this.died.push(diedNow);
      if (index !== 0) {
        this.infectedDelta.push(el.deltaConfirmed as number);
        this.diedDelta.push(diedNow - prevEl);
        prevEl = diedNow;
      }
    });
    this.setDailyData();
  }

  public setDailyData() {
    console.log('date', this.dateArray);
    console.log('infected', this.infected);
    console.log('died', this.died);
    console.log('infected delta', this.infectedDelta);
    console.log('died delta', this.diedDelta);


  }

  public formatNumber(value: number): string {
    const result = value.toLocaleString('en-us', { maximumFractionDigits: 2 });
    return result as string;
  }

}
