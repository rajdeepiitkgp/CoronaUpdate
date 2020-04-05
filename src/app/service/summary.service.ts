import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SummaryService {

  constructor(
    private http: HttpClient
  ) { }

  public fetchSummaryData(): Observable<any> {
    const serviceUrl = 'https://corona.lmao.ninja/all';
    return this.http.get(serviceUrl);
  }

  public fetchDailyData(): Observable<any> {
    const serviceUrl = 'https://covid19.mathdro.id/api/daily';
    return this.http.get(serviceUrl);
  }

  public fetchCountryData(): Observable<any>{
    const serviceUrl = 'https://corona.lmao.ninja/countries';
    return this.http.get(serviceUrl);
  }
}
