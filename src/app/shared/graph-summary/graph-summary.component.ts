import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-graph-summary',
  templateUrl: './graph-summary.component.html',
  styleUrls: ['./graph-summary.component.scss']
})
export class GraphSummaryComponent implements OnInit {

  constructor() { }

  @Input() dataLoaded: boolean;
  public options;

  ngOnInit(): void {
    const xAxisData = [];
    const data1 = [];
    const data2 = [];

    for (let i = 0; i < 100; i++) {
      xAxisData.push('category' + i);
      data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
      data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
    }

    this.options = {
      legend: {
        data: ['bar', 'bar2'],
        align: 'left'
      },
      tooltip: {},
      xAxis: {
        data: xAxisData,
        silent: false,
        splitLine: {
          show: false
        }
      },
      yAxis: {
      },
      series: [{
        name: 'bar',
        type: 'bar',
        data: data1,
        color:'#f00',
        animationDelay: (idx) => {
          return idx * 10;
        }
      }, {
        name: 'bar2',
        type: 'bar',
        data: data2,
        animationDelay: (idx) => {
          return idx * 10 + 100;
        }
      }],
      animationEasing: 'elasticOut',
      animationDelayUpdate: (idx) => {
        return idx * 5;
      }
    };
  }

}
