import { Component, AfterContentChecked, ChangeDetectorRef } from '@angular/core';
import { EventAggrigatorService } from './service/event-aggrigator.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterContentChecked {
  public progressFlag = false;
  constructor(
    private eventAggSrvc: EventAggrigatorService,
    private cdr: ChangeDetectorRef
  ) {
    this.eventAggSrvc.spinnerFlagChanged$.subscribe(value => {
      this.progressFlag = value;
    });
  }
  ngAfterContentChecked(): void {
    this.cdr.detectChanges();
  }

  public openCloseSideBar(e) {
    console.log(e);
  }
}
