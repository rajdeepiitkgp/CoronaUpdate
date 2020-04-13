import { Component, OnInit, OnDestroy } from '@angular/core';
import { CardModel } from '../models/card-model';
import { DashboardConstants } from './dashboard.constants';
import { SummaryService } from '../service/summary.service';
import { DatePipe } from '@angular/common';
import { forkJoin, Subscription } from 'rxjs';
import { GraphModel } from '../models/graph-model';
import { moveIn } from '../shared/router-animation';
import { NotificationService } from '../service/notification.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [moveIn()]
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
  public infectedModel: GraphModel = { ...DashboardConstants.demoCardModel };
  public deathModel: GraphModel = { ...DashboardConstants.demoCardModel };
  public dailyModel: GraphModel = { ...DashboardConstants.demoCardModel };
  public state = '';
  constructor(
    private summarySrvc: SummaryService,
    private datePipe: DatePipe,
    private notifySrvc: NotificationService
  ) {
    this.setModels();
  }

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
      try {
        this.processSummaryData(summaryData);
        this.processDailyData(dailyData);
      } catch (e) {
        this.handleError();
      }

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
    this.infectedModel.xAxisData = this.dateArray;
    this.infectedModel.yAxisData = this.infected;
    this.deathModel.xAxisData = this.dateArray;
    this.deathModel.yAxisData = this.died;
    this.dailyModel.xAxisData = this.dateArray;
    this.dailyModel.y1AxisData = this.infectedDelta;
    this.dailyModel.y2AxisData = this.diedDelta;
  }

  public formatNumber(value: number): string {
    const result = value.toLocaleString('en-us', { maximumFractionDigits: 2 });
    return result as string;
  }

  public setModels() {
    this.setInfectedModel();
    this.setDeathModel();
    this.setDailyModel();
  }
  public setInfectedModel() {
    this.infectedModel.footerText = 'Infected people history';
    this.infectedModel.color = '#ff9800';
    this.infectedModel.isHistogram = true;
    this.infectedModel.yTitle = 'Infected Histogram';
  }
  public setDeathModel() {
    this.deathModel.footerText = 'Deaths history';
    this.deathModel.color = '#f44336';
    this.deathModel.isHistogram = true;
    this.deathModel.yTitle = 'Death Histogram';
  }
  public setDailyModel() {
    this.dailyModel.footerText = 'Daily changes';
    this.dailyModel.isHistogram = false;
    this.dailyModel.y1Title = 'Rate of change for infected people';
    this.dailyModel.y2Title = 'Rate of change for death people';
  }
  public handleError() {
    this.notifySrvc.openSnackBar();
  }
}
