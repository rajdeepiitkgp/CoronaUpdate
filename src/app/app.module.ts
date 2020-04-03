import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { SideBarComponent } from './side-bar/side-bar.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TableListComponent } from './table-list/table-list.component';

@NgModule({
  declarations: [
    AppComponent,
    SideBarComponent,
    DashboardComponent,
    TableListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxEchartsModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
