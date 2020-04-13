import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { TableListConstants } from './table-list.constants';
import { SummaryService } from '../service/summary.service';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { moveInLeft } from '../shared/router-animation';
import { NotificationService } from '../service/notification.service';
@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.scss'],
  animations: [moveInLeft()]
})
export class TableListComponent implements OnInit, OnDestroy {

  public colDef = TableListConstants.colDef;
  public dataSource: MatTableDataSource<any> = null;
  private watcher: Subscription;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  public displayedColumns: any[];
  public searchKey = '';
  public state = '';
  constructor(
    private summarySrvc: SummaryService,
    private notifySrvc: NotificationService
  ) {
    this.displayedColumns = this.colDef.map(t => t.headerName);
    this.displayedColumns.splice(2, 0, 'flag');
  }


  ngOnInit(): void {
    this.initializeService();
  }

  ngOnDestroy(): void {
    this.watcher.unsubscribe();
  }


  public initializeService() {
    this.watcher = this.summarySrvc.fetchCountryData().subscribe(result => {
      try {
        this.prepareResultDisplay(result);
      } catch (e) {
        this.handleError();
      }
    });

  }
  public prepareResultDisplay(result: any[]) {
    result.sort((a, b) => {
      let m = a.cases as number;
      let n = b.cases as number;
      m = (m !== null) ? m : 0;
      n = (n !== null) ? n : 0;
      return n - m;
    });
    const finalData = [];
    result.forEach((el, index) => {
      const temp = {
        id: (index + 1),
        country: el.country,
        cases: this.formatNumber(el.cases as number),
        todayCases: this.formatNumber(el.todayCases as number),
        deaths: this.formatNumber(el.deaths as number),
        todayDeaths: this.formatNumber(el.todayDeaths as number),
        deathRate: this.formatNumber(100 * ((el.deaths as number) / (el.cases as number))) + '%',
        recovered: this.formatNumber(el.recovered as number),
        flag: el.countryInfo.flag
      };
      finalData.push(temp);
    });
    this.dataSource = new MatTableDataSource(finalData);
    this.dataSource.paginator = this.paginator;
  }
  public formatNumber(value: number): string {
    const result = (value !== null) ? value.toLocaleString('en-us', { maximumFractionDigits: 2 }) : '0';
    return result as string;
  }

  public onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  public applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }

  public handleError() {
    this.notifySrvc.openSnackBar();
  }
}

