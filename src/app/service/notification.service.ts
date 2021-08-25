import { Injectable } from '@angular/core';
import { EventAggrigatorService } from './event-aggrigator.service';
import { NotificationComponent } from '../notification/notification.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private delay = 5000;
  constructor(private eventAggSrvc: EventAggrigatorService, private snackBar: MatSnackBar) {}
  public openSnackBar() {
    this.eventAggSrvc.setSpinnerFlag(true);
    setTimeout(() => {
      this.eventAggSrvc.setSpinnerFlag(false);
    }, this.delay);
    this.snackBar.openFromComponent(NotificationComponent, { panelClass: 'mat-bg-orange', duration: this.delay });
  }
}
