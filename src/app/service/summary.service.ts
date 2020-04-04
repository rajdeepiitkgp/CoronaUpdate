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

  public fetchAllData(): Observable<any> {
    const serviceUrl = 'https://corona.lmao.ninja/all';
    return this.http.get(serviceUrl);
  }
}
