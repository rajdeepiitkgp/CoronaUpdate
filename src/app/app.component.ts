import { Component, AfterContentChecked, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { EventAggrigatorService } from './service/event-aggrigator.service';
import { Router, NavigationEnd, Event } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterContentChecked, OnInit, OnDestroy {
  public progressFlag = false;
  public opened = false;
  private watcher: Subscription;
  constructor(private eventAggSrvc: EventAggrigatorService, private cdr: ChangeDetectorRef, private router: Router) {
    this.eventAggSrvc.spinnerFlagChanged$.subscribe((value) => {
      this.progressFlag = value;
    });
  }
  ngOnDestroy(): void {
    this.watcher.unsubscribe();
  }
  ngOnInit(): void {
    this.watcher = this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        if (this.opened) {
          this.opened = !this.opened;
        }
      }
    });
  }
  ngAfterContentChecked(): void {
    this.cdr.detectChanges();
  }

  public openCloseSideBar(e) {
    this.opened = e.state;
  }
}
