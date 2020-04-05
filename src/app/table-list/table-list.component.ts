import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { TableListConstants } from './table-list.constants';
import { SummaryService } from '../service/summary.service';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.scss']
})
export class TableListComponent implements OnInit, OnDestroy {

  public colDef = TableListConstants.colDef;
  public dataSource: MatTableDataSource<TableData>;
  private watcher: Subscription;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private summarySrvc: SummaryService
  ) { }


  ngOnInit(): void {
    this.initializeService();
  }

  ngOnDestroy(): void {
    this.watcher.unsubscribe();
  }

  public applyFilter(params) { }

  public initializeService() {
    this.watcher = this.summarySrvc.fetchCountryData().subscribe(result => {
      this.prepareResultDisplay(result);
    });

  }
  public prepareResultDisplay(result: any[]) {
    const finalData: TableData[] = [];
    result.forEach((el, index) => {
      const temp: TableData = {
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
    console.log(finalData);
  }
  public formatNumber(value: number): string {
    const result = value.toLocaleString('en-us', { maximumFractionDigits: 2 });
    return result as string;
  }

}

export interface TableData {
  id: number;
  country: string;
  cases: string;
  todayCases: string;
  deaths: string;
  flag: string;
  todayDeaths: string;
  deathRate: string;
  recovered: string;
}
