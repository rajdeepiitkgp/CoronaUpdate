import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { SideBarComponent } from './side-bar/side-bar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TableListComponent } from './table-list/table-list.component';
import { LocationStrategy, HashLocationStrategy, DatePipe } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorInterceptor } from './models/http-error-interceptor';
import { TopNavbarComponent } from './top-navbar/top-navbar.component';
import { FooterComponent } from './footer/footer.component';
import { NotificationComponent } from './notification/notification.component';
@NgModule({
  declarations: [
    AppComponent,
    SideBarComponent,
    DashboardComponent,
    TableListComponent,
    TopNavbarComponent,
    FooterComponent,
    NotificationComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, HttpClientModule, SharedModule],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    DatePipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
