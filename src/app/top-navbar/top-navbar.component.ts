import { Component, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.scss']
})
export class TopNavbarComponent implements OnInit {
  public title = 'Dashboard';
  private sideBarClosed: boolean;
  @Output() emitOpenCloseSideBar: EventEmitter<any> = new EventEmitter();
  public iconTrigger = 'menu';
  constructor() { }

  ngOnInit(): void {
    this.sideBarClosed = true;
  }

  public openSidebar() {
    this.emitOpenCloseSideBar.emit({ state: this.sideBarClosed });
    this.sideBarClosed = !this.sideBarClosed;
    this.setIcon();
  }

  public setIcon() {
    this.iconTrigger = (this.sideBarClosed) ? 'menu' : 'close';
  }
}

