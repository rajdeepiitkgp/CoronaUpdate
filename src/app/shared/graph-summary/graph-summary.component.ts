import { Component, OnInit, Input, OnChanges, SimpleChange } from '@angular/core';
import { GraphModel } from 'src/app/models/graph-model';
import { EChartOption } from 'echarts';

@Component({
  selector: 'app-graph-summary',
  templateUrl: './graph-summary.component.html',
  styleUrls: ['./graph-summary.component.scss']
})
export class GraphSummaryComponent implements OnInit, OnChanges {

  @Input() dataLoaded: boolean;
  @Input() model: GraphModel;
  public options: EChartOption = {};

  constructor() { }

  ngOnInit(): void {
  }
  ngOnChanges(changes: { [propKey: string]: SimpleChange }): void {
    if (changes.dataLoaded.currentValue) {
      if (this.model.isHistogram) {
        this.setHistogram();
      } else {
        this.setDailyChange();
      }
    }
  }

  public setHistogram() {
    const tempOptions: EChartOption = {
      animationEasing: 'elasticOut',
      animationDelayUpdate: (idx) => {
        return idx * 5;
      }
    };
    tempOptions.legend = {};
    tempOptions.legend.data = [this.model.yTitle];
    tempOptions.legend.align = 'left';
    tempOptions.xAxis = { data: this.model.xAxisData };
    tempOptions.yAxis = {
      axisLabel: {
        formatter: (val) => {
          if (val < 1000) {
            return val;
          } else {
            const result = (val / 1000);
            if (result >= 1000) {
              return (result / 1000) + 'M';
            } else {
              return result + 'K';
            }
          }
        }
      }
    };
    tempOptions.series = [{
      name: this.model.yTitle,
      type: 'bar',
      data: this.model.yAxisData,
      animationDelay: (idx) => {
        return idx * 10;
      }
    }];
    tempOptions.tooltip = {};
    tempOptions.color = [this.model.color];
    this.options = tempOptions;
  }
  public setDailyChange() {
    const tempOptions: EChartOption = {
      animationEasing: 'elasticOut',
      animationDelayUpdate: (idx) => {
        return idx * 5;
      }
    };
    tempOptions.legend = {};
    tempOptions.legend.data = [this.model.y1Title, this.model.y2Title];
    tempOptions.legend.align = 'left';
    tempOptions.xAxis = { data: this.model.xAxisData };
    tempOptions.yAxis = {
      axisLabel: {
        formatter: (val) => {
          if (val < 1000) {
            return val;
          } else {
            const result = (val / 1000);
            if (result >= 1000) {
              return (result / 1000) + 'M';
            } else {
              return result + 'K';
            }
          }
        }
      }
    };
    tempOptions.series = [
      {
        name: this.model.y1Title,
        type: 'line',
        data: this.model.y1AxisData,
        animationDelay: (idx) => {
          return idx * 10;
        }
      },
      {
        name: this.model.y2Title,
        type: 'line',
        data: this.model.y2AxisData,
        animationDelay: (idx) => {
          return (idx * 10) + 100;
        }
      }
    ];
    tempOptions.tooltip = { trigger: 'axis' };
    tempOptions.color = [this.model.color1, this.model.color2];
    this.options = tempOptions;

  }

}
