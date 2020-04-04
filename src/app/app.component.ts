import { Component } from '@angular/core';
import { EventAggrigatorService } from './service/event-aggrigator.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'CoronaUpdate';
  public progressFlag = false;
  constructor(
    private eventAggSrvc: EventAggrigatorService
  ) {
    this.eventAggSrvc.spinnerFlagChanged$.subscribe(value => {
      this.progressFlag = value;
    });
  }
}
