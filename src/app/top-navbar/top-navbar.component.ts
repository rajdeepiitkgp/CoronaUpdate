import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChange } from '@angular/core';


@Component({
  selector: 'app-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.scss']
})
export class TopNavbarComponent implements OnInit, OnChanges {
  public title = 'Dashboard';
  private sideBarClosed: boolean;
  @Output() emitOpenCloseSideBar: EventEmitter<any> = new EventEmitter();
  @Input() parentState: boolean;
  public iconTrigger = 'menu';
  constructor() { }

  ngOnInit(): void {
    this.sideBarClosed = true;
  }
  ngOnChanges(changes: { [propKey: string]: SimpleChange }): void {
    if (!changes.parentState.currentValue) {
      this.sideBarClosed = true;
      this.setIcon();
    }
  }
  public openSidebar() {
    this.emitOpenCloseSideBar.emit({ state: this.sideBarClosed });
    this.sideBarClosed = false;
    this.setIcon();
  }

  public setIcon() {
    this.iconTrigger = (this.sideBarClosed) ? 'menu' : 'close';
  }
}

