import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventAggrigatorService {
  private spinnerFlagSource = new Subject<boolean>();
  public spinnerFlagChanged$ = this.spinnerFlagSource.asObservable();

  public setSpinnerFlag(flag: boolean) {
    this.spinnerFlagSource.next(flag);
  }
}
